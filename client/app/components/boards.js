class Boards extends React.Component {
  constructor(props) {
  
  }

  clickBoard() {
    this.context.router.push({ pathname: "/topics", query: { q: trimmedTerm } });
  }

  render() {
    return ();
  }
}
