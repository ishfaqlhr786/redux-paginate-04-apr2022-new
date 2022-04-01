import React, { Component } from 'react'

export default class Willmount extends Component {
   componentWillMount(){
       console.log("will mount callled")
   }
    render() {
       // console.log("will mount callled999")
        return (
            <div>
                <h2>kkk</h2>
            </div>
        )
    }
}
