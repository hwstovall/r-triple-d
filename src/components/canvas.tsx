import * as React from 'react';
import { Drawable } from './drawables/drawable';

interface CanvasContextValue {
  canvasWidth: number;
  canvasHeight: number;
  animationDuration: number;
  addDrawable(key: Symbol, drawable: Drawable): void;
  removeDrawable(key: Symbol): void;
}

export const CanvasContext = React.createContext<CanvasContextValue>({
  canvasWidth: 0,
  canvasHeight: 0,
  animationDuration: 0,
  addDrawable: (key: Symbol, drawable: Drawable) => { /* */ },
  removeDrawable: (key: Symbol) => { /* */ },
});

interface CanvasState {
  readonly width: number;
  readonly height: number;
}

interface CanvasProps {
  readonly children: React.ReactNode;
}

export class Canvas extends React.Component<CanvasProps, CanvasState> {
  public state: CanvasState;

  private rootRef: React.RefObject<HTMLDivElement>;
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  private dpi: number;

  private drawables: Map<Symbol, Drawable>;

  constructor(props: CanvasProps) {
    super(props);

    this.rootRef = React.createRef();
    this.canvasRef = React.createRef();

    this.dpi = window.devicePixelRatio;

    this.drawables = new Map();

    this.state = {
      width: 0,
      height: 0,
    };
  }

  public componentDidMount() {
    this.updateDimensions();
    this.draw();
  }

  private updateDimensions() {
    const { offsetWidth: width, offsetHeight: height } = this.rootRef.current;
    this.setState({ width, height });
  }

  private addDrawable(key: Symbol, drawable: Drawable) {
    this.drawables.set(key, drawable);
  }

  private removeDrawable(key: Symbol) {
    this.drawables.delete(key);
  }

  private draw() {
    if (this.canvasRef.current) {
      const ctx = this.canvasRef.current.getContext('2d');
      ctx.save();
      ctx.scale(this.dpi, this.dpi);
  
      ctx.clearRect(0, 0, this.state.width, this.state.height);
      this.drawables.forEach((drawable) => drawable.draw(ctx));
      ctx.restore();
    }

    window.requestAnimationFrame(() => this.draw());
  }

  public render() {
    const { width, height } = this.state;
    const contextValue: CanvasContextValue = {
      canvasWidth: width,
      canvasHeight: height,
      animationDuration: 0,
      addDrawable: (k, d) => this.addDrawable(k, d),
      removeDrawable: (k) => this.removeDrawable(k),
    }

    return (
      <div ref={this.rootRef} style={{ minHeight: '200px', height: '100%' }}>
        <CanvasContext.Provider value={contextValue}>
          {width > 0 && height > 0 && this.props.children}
        </CanvasContext.Provider>
        <canvas style={{ width, height }} width={width * this.dpi} height={height * this.dpi} ref={this.canvasRef} />
      </div>
    );
  }
}