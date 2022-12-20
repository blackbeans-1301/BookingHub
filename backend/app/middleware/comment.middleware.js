const { Op } = require("sequelize");
const db = require("../models/index.js");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const User = db.user;
const Owner = db.owner;
const Reservation = db.reservation;
const Occupied_room = db.occupied_room;
const Comment = db.comment;

const controllers = require("../controllers/controller.js");
const commentControllers = require("../controllers/comment.controller.js");

exports.createComment = async (req, res) => {
    let condition1 = {
        reservation_id: req.body.reservation_id
    }
    // kiem tra da ton tai comment chua
    let commentListData = await controllers.FindManyData(Comment, condition1);
    if (commentListData.length) {
        return res.status(400).send({message: "Reservation already has a comment"})    
    }
    // lay hotel ma co reservation cua comment
    let reservationData = await commentControllers.GetReservationInfo(Reservation, Room, Hotel, condition1);

    if (reservationData.status !== "completed") {
        return res.status(400).send({message: "Only completed reservation can be reviewed"})
    }
    
    let hotel_id = reservationData.Rooms[0].dataValues.Hotel.dataValues.hotel_id;
    let condition2 = {
        hotel_id: hotel_id
    }
    // lay tong va so luong rating
    let commentHotelData = await commentControllers.GetCommentByHotelId(Comment, Reservation, Room, User, condition2);
    let ratingAmount = commentHotelData.length
    let ratingSum = 0;
    for (let comment of commentHotelData) {
        ratingSum += comment.dataValues.rating
    }
    
    // kiem tra rating thoa man khong
    if (req.body.rating !== undefined && (req.body.rating.length !== 1 || !(req.body.rating[0] >= '1' && req.body.rating[0] <= '5'))) {
        return res.status(400).send({message: "Invalid rating"})
    }

    //Create comment
    let valueComment = {
        reservation_id: req.body.reservation_id,
        content: req.body.content,
        rating: req.body.rating
    }
    let commentData = await controllers.CreateData(Comment, valueComment);
    if (commentData.code === -2) {
        return res.status(400).send({ message: "Unable to create comment", err: commentData.err })
    }

    // tinh lai rating sau khi tao comment
    ratingSum += parseFloat(commentData.rating);
    ratingAmount++;
    let ratingAverage = parseFloat((ratingSum/ratingAmount).toFixed(1));

    //Update lai rating o hotel
    let valueRating = {
        rating: ratingAverage
    }
    let result = await controllers.UpdateData(Hotel, valueRating, condition2);
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to update rating"})
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update rating", err: result.err})
    }
    return res.status(200).send(commentData);
}

exports.getCommentOfHotel = async (req, res) => {
    let condition = {
        hotel_id: req.params.hotel_id
    }
    let commentData = await commentControllers.GetCommentByHotelId(Comment, Reservation, Room, User, condition);
    if (commentData.code === -2) {
        return res.status(400).send({message: "Can't get comment of hotel", err: commentData.err})
    }
    return res.status(200).send(commentData);
}

exports.getCommentReservation = async (req, res) => {
    let condition = {
        reservation_id: req.params.reservation_id
    }
    let commentData = await controllers.FindOneData(Comment, condition)
    if (commentData.code === -1) {
        return res.status(400).send({message: "Reservation isn't exist"})
    }
    if (commentData.code === -2) {
        return res.status(400).send({message: "Unable to get comment of reservation", err: commentData.err});
    }
    // format lai dateTime 
    commentData.createdAt = controllers.FormatDateTime(commentData.createdAt);
    commentData.updatedAt = controllers.FormatDateTime(commentData.updatedAt);
    return res.status(200).send(commentData);
}

exports.updateComment = async (req, res) => {
    var preRating;
    // kiem tra rating co hop le hay k
    if (req.body.rating !== undefined && (req.body.rating.length !== 1 || !(req.body.rating[0] >= '1' && req.body.rating[0] <= '5'))) {
        return res.status(400).send({message: "Invalid rating"})
    }

    // lay hotel ma co reservation cua comment
    let condition1 = {
        reservation_id: req.body.reservation_id
    }
    let reservationData = await commentControllers.GetReservationInfo(Reservation, Room, Hotel, condition1);

    // lay tong rating va so luong rating
    let hotel_id = reservationData.Rooms[0].dataValues.Hotel.dataValues.hotel_id;
    let condition2 = {
        hotel_id: hotel_id
    }
    let commentHotelData = await commentControllers.GetCommentByHotelId(Comment, Reservation, Room, User, condition2);
    let ratingAmount = commentHotelData.length
    let ratingSum = 0;
    for (let comment of commentHotelData) {
        ratingSum += comment.dataValues.rating
        if (comment.dataValues.reservation_id === req.body.reservation_id) {
            preRating = comment.dataValues.rating
        }
    }

    // update comment
    let value = {
        content: req.body.content,
        rating: req.body.rating
    }
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let resultUpdateComment = controllers.UpdateData(Comment, value, condition);
    if (resultUpdateComment.code === -1) {
        return res.status(400).send({message: "Updated comment unsuccessfully"})
    }
    if (resultUpdateComment.code === -2) {
        return res.status(400).send({message: "Updated comment unsuccessfully", err: resultUpdateComment.err});
    }

    // tinh lai rating sau khi tao comment
    ratingSum = ratingSum - preRating + parseFloat(req.body.rating);
    let ratingAverage = parseFloat((ratingSum/ratingAmount).toFixed(1));
    console.log({ratingAmount, ratingSum, preRating, rating: parseFloat(req.body.rating)}, ratingAverage)
    //Update lai rating o hotel
    let valueRating = {
        rating: ratingAverage
    }
    let result = await controllers.UpdateData(Hotel, valueRating, condition2);
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to update rating"})
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update rating", err: result.err})
    }
    return res.status(200).send({message: "Updated comment successfully"});
}

exports.deleteComment = async (req, res) => {
    var preRating;

    // lay hotel ma co reservation cua comment
    let condition1 = {
        reservation_id: req.body.reservation_id
    }
    let reservationData = await commentControllers.GetReservationInfo(Reservation, Room, Hotel, condition1);

    // lay tong rating va so luong rating
    let hotel_id = reservationData.Rooms[0].dataValues.Hotel.dataValues.hotel_id;
    let condition2 = {
        hotel_id: hotel_id
    }
    let commentHotelData = await commentControllers.GetCommentByHotelId(Comment, Reservation, Room, User, condition2);
    let ratingAmount = commentHotelData.length
    let ratingSum = 0;
    for (let comment of commentHotelData) {
        ratingSum += comment.dataValues.rating
        if (comment.dataValues.reservation_id === req.body.reservation_id) {
            preRating = comment.dataValues.rating
        }
    }
    
    // xoa comment
    let resultDelete = await controllers.DeleteData(Comment, condition1)
    if (!resultDelete) {
        return res.status(400).send("Reservation don't have comment")
    }

    // tinh lai rating sau khi tao comment
    ratingSum = ratingSum - preRating;
    ratingAmount--
    let ratingAverage = parseFloat((ratingSum/ratingAmount).toFixed(1));
    console.log({ratingAmount, ratingSum, preRating}, ratingAverage)

    //Update lai rating o hotel
    let valueRating = {
        rating: ratingAverage
    }
    let result = await controllers.UpdateData(Hotel, valueRating, condition2);
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to update rating"})
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update rating", err: result.err})
    }
    return res.status(200).send({message: "Deleted comment successfully"});

}
