import React from 'react';

function ShoeList(props) {
    return (
      <table className="table table-striped">
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Bin</th>
        </tr>
      </thead>
      <tbody>
          {props.shoes.map(shoe => {
            return (
              <tr key={shoe.href}>
                <td>{ shoe.model_name }</td>
                <td>{ shoe.bin.closet_name }</td>
              </tr>
            );
          })}
      </tbody>
    </table>
    )
  }

  export default ShoeList;
