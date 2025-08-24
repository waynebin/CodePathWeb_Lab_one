import React from 'react';
import Event from './Event';














//To create a React functional component, define a function called Calendar using arrow function notation.

const Calendar =() =>{
    return(
        <div className="calendar">
            <table>
                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="time">8 AM</td>
                        <Event event='Starbucks ☕️' color ='green'/>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Event event='Yolk 🍳' color ='green'/>
                        <td></td>
                    </tr>
                     {/* calendar times 1*/}
                    <tr>
                        <td className="time">9 AM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 2*/}
                        <tr>
                        <td className="time">10 AM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 3*/}
                    <tr>
                        <td className="time">11 AM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 4*/}

                    <tr>
                        <td className="time">12 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 5*/}

                    <tr>
                        <td className="time">1 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 6*/}

                     <tr>
                        <td className="time">2 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 7*/}
                    <tr>
                        <td className="time">3 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 8*/}
                    <tr>
                        <td className="time">4 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                        {/* calendar times 9*/}

                    <tr>
                        <td className="time">5 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>10</td>
                    </tr>
                        {/* calendar times 10*/}

                    

                     


















                </tbody>
            </table>
            {/* You can add more functionality and styling here */}
        </div>
    )
}








// To export the Calendar component, use the export statement at the end of the file.
export default Calendar;