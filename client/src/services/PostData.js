import axios from "axios";
export function PostData(type, userData) {
    return new Promise((resolve, reject) =>{
      axios.post("/"+type, userData).then((res) => {
          resolve(res.data);
      });
        // fetch('/'+type, {
        //     method: 'POST',
        //     // body: JSON.stringify(userData)
        //     body: userData
        //   })
        //   .then((response) => response.json())
        //   .then((res) => { console.log(res);
        //     resolve(res);
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });


      });
}
