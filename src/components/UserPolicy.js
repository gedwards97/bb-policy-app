import { useState, useEffect } from 'react'

const UserPolicy = (accessToken) => {

    // Component States
    const [loading, setLoading] = useState(false);
    const [policy, setPolicy] = useState({});
    const [vehicle, setVehicle] = useState({});
    const [address, setAddress] = useState({});

    const url = "https://api.bybits.co.uk/policys/details";
    const options = {
        headers: {
            'environment': "mock",
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': "application/json"
        }
    };

    const fetchPolicy = async () => {
        try {
            setLoading(true);
            const response = await fetch(url, options);
            const json_data = await response.json();
            setPolicy(json_data.policy);
            setVehicle(json_data.vehicle);
            setAddress(json_data.policy.address);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchPolicy();
    }, []);

    return (
        <div>
            {!loading ? 
            <div className="policy-container">
                <h2>My Policy</h2>
                <h3>Policy Reference:</h3>
                <p>{policy.policy_reference}</p>            
                <h3>Cover Type:</h3>
                <p>{policy.cover}</p>
                <h3>Car:</h3>
                <p>{vehicle.make + " " + vehicle.model + " " +
                vehicle.colour + "-" + vehicle.reg}</p>
                <h3>Address:</h3>
                <p>{address.line_1 + ", " + address.line_2 + ", " + address.postcode}</p>
            </div> : <h2>LOADING</h2>
            }
        </div> 
    )
}

export default UserPolicy;
