import React from "react";

const AnimatedBackground = () => {
  return (
    <>
      <div className="box relative rounded-2xl">
        <div className="box-inner rounded-2xl"></div>
      </div>
    </>
  );
};

export default AnimatedBackground;



// import React from "react";

// const getColorForValue = (value) => {
//   if (value <= 50) {
//     return { color: '#24c45c', opacity: 0.10 };
//   } else if (value <= 100) {
//     return { color: '#ecb40c', opacity: 0.25 };
//   } else if (value <= 200) {
//     return { color: '#fc7414', opacity: 0.1 };
//   } else if (value <= 300) {
//     return { color: '#ec4444', opacity: 0.25 };
//   } else if (value <= 400) {
//     return { color: '#7c1c1c', opacity: 0.25 };
//   } else {
//     return { color: '#5c1c84', opacity: 0.1 };
//   }
// };

// const AnimatedBackground = ({ value }) => {
//   const { color, opacity } = getColorForValue(105);

//   const backgroundImage = `
//     url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='-10.959%25' y2='100%25'%3e%3cstop stop-color='${encodeURIComponent(color)}' stop-opacity='${opacity}' offset='0%25'/%3e%3cstop stop-color='${encodeURIComponent(color)}' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath fill='url(%23a)' fill-rule='evenodd' d='M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z'/%3e%3c/svg%3e"),
//     url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='-10.959%25' y2='100%25'%3e%3cstop stop-color='${encodeURIComponent(color)}' stop-opacity='${opacity}' offset='0%25'/%3e%3cstop stop-color='${encodeURIComponent(color)}' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath fill='url(%23a)' fill-rule='evenodd' d='M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z'/%3e%3c/svg%3e"),
//     url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='-10.959%25' y2='100%25'%3e%3cstop stop-color='${encodeURIComponent(color)}' stop-opacity='${opacity}' offset='0%25'/%3e%3cstop stop-color='${encodeURIComponent(color)}' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath fill='url(%23a)' fill-rule='evenodd' d='M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z'/%3e%3c/svg%3e")
//   `;

//   return (
//     <div className="box relative rounded-2xl" style={{ backgroundImage }}>
//       <div className="box-inner rounded-2xl" style={{ backgroundImage }}></div>
//     </div>
//   );
// };

// export default AnimatedBackground;
