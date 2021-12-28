// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./index.css";

// const DatePic = (props) => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <div className="form-group formbox">
//       <DatePicker
//         selected={startDate}
//         // onChange={(date) => setStartDate(date)}
//         onChange={(e)=> props.onChange(e.target.value)} 
//       />
//     </div>
//   );
// };

// export default DatePic;

// import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import "./index.css";

// import "react-datepicker/dist/react-datepicker.css";

// class DatePic extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       startDate: new Date()
//     };
//   }

//   handleChange = (date = this.props.date) => {
//     console.log(date);
//     this.setState({
//       startDate: date
//     })
//   }

//   onFormSubmit = (e) => {
//     e.preventDefault();
//     console.log(this.state.startDate)
//   }

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <div className="form-group formbox">
//           {/* <DatePicker
//             selected={this.state.startDate}
//             onChange={this.handleChange}
//             name="startDate"
//             dateFormat="MM/dd/yyyy"

//           /> */}
//           {/* <button className="btn btn-primary">Show Date</button> */}
//         </div>
//       </form>
//     );
//   }

// }

// export default DatePic;
