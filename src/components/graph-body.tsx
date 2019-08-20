import * as React from 'react';
import * as d3 from 'd3';


interface Dimensions {
  readonly width: number;
  readonly height: number;
}

interface BodyProps {
  readonly ref: React.RefObject<Body>;
}

interface BodyState {
  readonly dimensions: Dimensions;
}

export class Body extends React.Component<BodyProps, BodyState> {
  public svg: React.RefObject<SVGSVGElement>;
  public dimensions: Dimensions;

  private root: React.RefObject<HTMLDivElement>;

  public state: BodyState;

  constructor(props: BodyProps) {
    super(props);

    this.svg = React.createRef();
    this.root = React.createRef();

    this.dimensions = { width: 0, height: 0 };
    this.state = { dimensions: this.dimensions };
  }

  public componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize();
  }

  private handleResize() {
    const width = this.root.current.offsetWidth;
    const height = this.root.current.offsetHeight;

    this.dimensions = { width, height };
    this.setState({ dimensions: this.dimensions });
  }

  public render() {
    return (
      <div className='rd3-graph-body' ref={this.root} style={{ height: '100px' }}>
        <svg ref={this.svg} width={this.state.dimensions.width} height={this.state.dimensions.height} />
      </div>
    );
  }
} 