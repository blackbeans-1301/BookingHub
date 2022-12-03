import * as React from "react";
import { useState } from "react";

export default function PreviewImage(file) {
    const [preview, setPreview] = useState({});
    console.log('file', file);
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview({
                src: reader.result,
                alt: file.name,
            });
        };
    }

    return (
        <div>
            <img src={preview.src} alt={preview.alt} />
        </div>
    )
}