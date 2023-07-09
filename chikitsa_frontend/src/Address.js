import React from "react";

const Address = ({profileData}) =>{
    return(
        <table>
            <tbody>
                <tr>{profileData.address_line},</tr>
                <tr>{profileData.district} - {profileData.pincode},</tr>
                <tr>{profileData.state}</tr>
            </tbody>
        </table>
    )
}

export default Address;