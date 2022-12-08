import React from 'react'

class Shoes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            model_name: '',
            manufacturer: '',
            color: '',
            picture_url: '',
            bin: '',
            bins: [],
            shoes: [],
            toggled: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleState = this.toggleState.bind(this);

    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.bins;
        delete data.shoes;
        delete data.toggled;
        // console.log(data)
        const binId = data.bin;

        const shoeUrl = `http://localhost:8080/api/bins/${binId}/shoes/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json()
            console.log(newShoe)

            const cleared = {
              model_name: '',
              manufacturer: '',
              color: '',
              picture_url: '',
              bin: '',
            };
            this.setState(cleared);
            this.toggleState()
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({[event.target.name]: value})
    }

    async handleDelete(shoe) {
        const index = this.state.shoes.indexOf(shoe)
        this.state.shoes.splice(index,1)
        this.setState({shoes: [...this.state.shoes]})
        const deleteUrl =await fetch( `http://localhost:8080/api/shoes/${shoe.id}/`, {method:'delete'})
    }

    toggleState() {
        this.setState({toggled:!this.state.toggled})
    }

    async componentDidMount() {
        const binsUrl = 'http://localhost:8100/api/bins/'
        const shoesUrl = 'http://localhost:8080/api/shoes/'

        const binsResponse = await fetch(binsUrl);
        const shoesResponse = await fetch(shoesUrl);

        if (binsResponse.ok) {
            const data = await binsResponse.json();
            this.setState({bins: data.bins})
        }
        if (shoesResponse.ok) {
          const data = await shoesResponse.json();
          this.setState({shoes: data.shoes})
    }
}

    render() {
        let hideForm = ""
        let shoeList = "form-select d-none"
        
        if (this.state.toggled === false){
            hideForm = "d-none"
            shoeList = ""
        }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <div className= {hideForm}>
                        <h1>Create a new shoe</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoe-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.model_name} placeholder="model name" required type="text" name="model_name" id="model_name" className="form-control"/>
                                <label htmlFor="model_name">Model name</label>
                            </div>
                            <div className="mb-3">
                                <input onChange={this.handleChange} value={this.state.manufacturer} type="manufacturer" className="form-control" name="manufacturer" id="manufacturer" placeholder="manufacturer"/>
                                <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.color} placeholder="color" type="text" name="color" id="color" className="form-control"/>
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.picture_url} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                                <label htmlFor="picture_url">Picture url</label>
                            </div>
                            <div className="mb-3">
                            <select value={this.state.bin} onChange={this.handleChange} required id="bin" name="bin" className="form-select">
                                <option value="">Choose a bin</option>
                                {this.state.bins.map(bin => {
                                    return(
                                        <option key={bin.id} value={bin.id}>
                                            {bin.closet_name}
                                        </option>
                                    )
                                })}
                            </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                            <button onClick = { this.toggleState} className="btn btn-primary">View shoes</button>
                        </form>
                        </div>
                        <div className={shoeList}>
                          <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Model Name</th>
                              <th>Bin</th>
                            </tr>
                          </thead>
                          <tbody>
                              {this.state.shoes.map(shoe => {
                                return (
                                  <tr key={shoe.href}>
                                    <td>{ shoe.model_name }</td>
                                    <td>{ shoe.bin.closet_name }</td>
                                    <td><button onClick={()=>this.handleDelete(shoe)} className = "btn btn-secondary"> Delete Shoe </button></td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <button onClick = { this.toggleState} className="btn btn-primary">Create a new shoe</button>
                      </div>
                    </div>
                </div>
            </div>
        );

}
}
export default Shoes;
