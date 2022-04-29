interface Load {
  root: HTMLElement | null;
  obs: HTMLElement;
  load: () => void;
}

export class List<T extends Load> {
  private observer: IntersectionObserver | undefined;
  public readonly opt: Load;
  constructor(opt: T) {
    this.opt = opt;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(this.callback.bind(this), {
      root: this.opt.root,
    });
    this.handleObserver();
  }

  callback(entries: IntersectionObserverEntry[]) {
    console.log(entries);
    this.opt.load();
  }

  handleObserver() {
    this.observer?.observe(this.opt.obs);
  }

  cancelObserver() {
    this.observer?.unobserve(this.opt.obs);
  }
}
