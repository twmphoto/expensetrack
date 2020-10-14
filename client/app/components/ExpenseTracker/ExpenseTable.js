const { ExpenseTracker } = require("./ExpenseTracker");

const TableComponent = ({
    data
  }) => {
    let headings = Object.keys(data[1]);
    return (
      <table className='table table-bordered'>
        <thead>
          <tr>
            {
              headings.map(heading => <th>{heading}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
              data.map(item => 
                <tr>
                 {
                    headings.map(heading => <td>{item[heading]}</td>) 
                 }
                </tr>
              )
          }
        </tbody>
      </table>
    );
  }
  
  
  ReactDOM.render(<ExpenseTracker data={this.props}/>, document.getElementById('app'));