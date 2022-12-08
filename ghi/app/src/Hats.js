import React from 'react';

class Hats extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     style: '',
  //     fabric: '',
  //     color: '',
  //     pictureUrl: '',
  //     location: '',
  //     locations: [],
  //     hats: [],
  //     toggled: false,
  //   };
  // }

  state = {
    style: '',
    fabric: '',
    color: '',
    picture_url: '',
    location: '',
    locations: [],
    hats: [],
    toggled: false, 
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {...this.state};
    delete data.locations;
    delete data.hats;
    delete data.toggled;
    const locationId = data.location;

    const hatUrl = 'http://localhost:8090/api/hats/${locationId}/hats/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({
        style: this.state.style,
        fabric: this.state.fabric,
        color: this.state.color,
        picture_url: this.state.picture_url,
        location: this.state.location,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
        const newHat = await response.json();
        const cleared = {
            style: '',
            fabric: '',
            color: '',
            picture_url: '',
            location: '',
      };

      this.setState(cleared);
      this.toggleState()
    }
  }

  toggleState() {
    this.setState({toggled: this.state.toggled})
  }

  handleChange = async (event) => {
    const value = event.target.value;
    this.setState({[event.target.name]:value})
  }

  handleDelete = async (hat) => {
    const deleteUrl = await fetch("http://localhost:8090/api/hats/" + hat.id, {method:'delete'})
    
    const index = this.state.hats.indexOf(hat)
    
    // this.state.hats.splice(index,1)
    // this.setState({hats:[...this.state.shoes]})

    this.setState({
      hats:[this.state.hats.filter(h=> h.id !== hat.id)]
    })
  }


  async componentDidMount() {
    const hatsUrl = 'http://localhost:8090/api/hats/'
    const hatsResponse = await fetch(hatsUrl);
    if (hatsResponse.ok) {
      const data = await hatsResponse.json();
      this.setState({hats: data.hats});
    }

    const locationsUrl = 'http://localhost:8100/api/locations/';
    const locationsResponse = await fetch(locationsUrl);
    if (locationsResponse.ok) {
      const data = await locationsResponse.json();
      this.setState({locations: data.locations});
    }
}

  render() {
      let hideForm = ""
      let hatList = "form-select d-none"

      if (this.state.toggled === false){
        hideForm = "d-none"
        hatList = ""
      }

      return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <div classNme={hideForm}>
            <h1>Create a new hat</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.style}  placeholder="Style" required type="text" name="style" id="style" className="form-control" />
                <label htmlFor="style">Style</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.fabric}  placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.pictureUrl}  placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select value={this.state.location} onChange={this.handleChange} required id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.closet_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
              <button onClick ={this.toggleState} className="btn btn-primary">View Hats</button>
            </form>
            </div>
            <div className ={hatList}>
             <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Style</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                  {this.state.hats.map(hat => {
                    return (
                      <tr key={hat.href}>
                        <td>{ hat.style }</td>
                        <td>{ hat.location.closet_name }</td>
                        <td><button onClick={()=>this.handleDelete(hat)} className = "btn btn-secondary"> Delete Hat </button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button onClick = { this.toggleState} className="btn btn-primary">Create A New Hat</button>
            </div>
          </div>
        </div>
      </div>
    );
}
}
export default Hats;
