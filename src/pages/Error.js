import React from 'react';
import error from '../images/404.png';

function Error() {
  return (
    <div>
        <div>
            <img src={error} alt="error" style={{width: "100%", }} />
        </div>
    </div>
  )
}

export default Error