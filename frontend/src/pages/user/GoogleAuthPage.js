import React from "react"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import * as queryString from "query-string"
import { setLSItem, getLSItem, redirect } from "../../utils"

const GoogleAuthPage = ({ location }) => {
  console.log("location", location.search)
  let param = new URLSearchParams(location.search)
  let paramString = param.toString()
  //   const [foo, setFoo] = useQueryParam('foo', StringParam);
  //   const [foo1, setFoo1] = useQueryParam('foo1', StringParam);
  console.log('type', typeof param, param)
  console.log('string', paramString)

  let token = paramString.substring(2)
  setLSItem("token", token)
  console.log("get token", getLSItem('token'))

  setTimeout(() => {
    redirect(process.env.API_URL)
  }, 100)

  return (
    <div>
      {/* <h1>parameter1 is {param}</h1> */}
    </div>
  )
}

export default GoogleAuthPage

// import React from "react";
// import { useQueryParam, NumberParam, StringParam } from "use-query-params";

// const GoogleAuthPage = () => {
//   // something like: ?x=123&foo=bar in the URL
//   const [num, setNum] = useQueryParam("x", NumberParam);
//   const [foo, setFoo] = useQueryParam("foo", StringParam);

//   return (
//     <div>
//       <h1>num is {num}</h1>
//       <button onClick={() => setNum(Math.random())}>Change</button>
//       <h1>foo is {foo}</h1>
//       <button onClick={() => setFoo(`str${Math.random()}`)}>Change</button>
//     </div>
//   );
// };

// export default GoogleAuthPage;
