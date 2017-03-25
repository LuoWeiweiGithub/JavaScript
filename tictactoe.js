function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
    };
    this.currentIndex = 0;
  }
  handleClick(i){
    let history = this.state.history;
    let squares = history[this.currentIndex].squares;
    let winner = calculateWinner(squares);
    if (winner) {
      return;
    }
    squares = squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    if (history.length != this.currentIndex + 1){
      history = history.slice(0, this.currentIndex + 1);
    }
    
    this.setState({
      history: history.concat([{squares: squares}]),
      xIsNext: !this.state.xIsNext
    });
    this.currentIndex = this.currentIndex + 1;
  }
  jumpTo(move){
    this.currentIndex = move;
    this.setState({
      xIsNext: move % 2 == 0 ? 'O' : 'X',
    });
  }
  render() {
    const history = this.state.history;
    let current = history[this.currentIndex];
    let winner = calculateWinner(current.squares);
    let status;
    if (winner){
      status = 'Winnner is ' + winner;
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game Start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

