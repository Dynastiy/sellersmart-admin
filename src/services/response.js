/* eslint-disable no-prototype-builtins */
// import { useToast } from "vue-toastification";
import toastify from 'toastify-js'

// const toast = useToast();
export const catchAxiosError = (error) => {
  if (error?.data) {
    const responseData = error.data
    // Display the main error message
    if (responseData.message) {
      // toast.error(responseData.message, {
      //   timeout: 4000
      // })
      toastify({
        text: `${responseData.message}`,
        gravity: 'top',
        position: 'center',
        style: {
          fontSize: '14px',
          borderRadius: '4px',
          background: '#ff0000'
        }
      }).showToast()
    }
    // Display individual error messages
    if (responseData.errors) {
      for (const key in responseData.errors) {
        if (responseData.errors.hasOwnProperty(key)) {
          responseData.errors[key].forEach((errorMessage) => {
            // toast.error(errorMessage, {
            //   timeout: 6000
            // })
            toastify({
              text: `${errorMessage}`,
              gravity: 'top',
              position: 'center',
              style: {
                fontSize: '14px',
                borderRadius: '4px',
                background: '#ff0000'
              }
            }).showToast()
          })
        }
      }
    }
  } else {
    // Handle generic error when no specific message is available
    // toast.error('An error occurred.', {
    //   timeout: 4000
    // })
    toastify({
      text: `An error Occurred`,
      gravity: 'top',
      position: 'center',
      style: {
        fontSize: '14px',
        borderRadius: '4px',
        background: '#ff0000'
      }
    }).showToast()
  }
}
// export const catchAxiosError = (error) => {
//       console.log(error.response?.data?.message)

//   if (error.response?.data?.message) {
//     // Handle the main error message
//     toast.error(error.response.data.message, {
//       timeout: 4000
//     })
//   } else if (error.response?.data?.errors) {
//     // Handle validation errors
//     for (const key in error.response.data.errors) {
//       if (error.response.data.errors.hasOwnProperty(key)) {
//         toast.error(error.response.data.errors[key][0], {
//           timeout: 18000
//         })
//       }
//     }
//   } else {
//     // Handle generic error when no specific message is available
//     toast.error('An error occurred.', {
//       timeout: 4000
//     })
//   }
// }
// export const catchAxiosError = (error) => {

//     console.log(error.response?.data?.message)

//     if (error.response?.data?.message) {
//       toast.error(error.response?.data?.message, {
//         timeout: 4000
//       })
//     }

//     if(error.response?.data?.errors){
//         for (let key in error.response.data.errors) {
//             toast.error(error.response.data.errors[key][0], {
//                 timeout: 18000,
//             });
//         }
//     }

// }

export const catchAxiosSuccess = (res) => {
  if (res?.data?.message) {
    // toast.success(res.data.message, {
    //     timeout: 4000,
    // });
    // toast.error(responseData.message, {
    //   timeout: 4000
    // })
    toastify({
      text: res.data.message,
      gravity: 'top',
      position: 'center',
      style: {
        fontSize: '14px',
        borderRadius: '4px',
        background: '#333'
      }
    }).showToast()
  } else if (res?.data?.message === '') {
    toastify({
      text: `Success`,
      gravity: 'top',
      position: 'center',
      style: {
        fontSize: '14px',
        borderRadius: '4px',
        background: '#333'
      }
    }).showToast()
  }
}

export default { catchAxiosError, catchAxiosSuccess }
