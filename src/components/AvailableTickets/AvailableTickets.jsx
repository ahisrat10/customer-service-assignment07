import React, { use } from 'react';

const AvailableTickets = ({ticketsPromise}) => {

    const ticketData = use(ticketsPromise)
    console.log(ticketData)
    return (
        <div>
            
        </div>
    );
};

export default AvailableTickets;