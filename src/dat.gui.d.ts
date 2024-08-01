declare module 'dat.gui' {
    export class GUI {
      constructor(options?: GUIParams);
      add(target: object, propName: string, min?: number, max?: number, step?: number): GUIController;
      add(target: object, propName: string, status?: boolean): GUIController;
      add(target: object, propName: string, items: string[]): GUIController;
      add(target: object, propName: string, items: number[]): GUIController;
      add(target: object, propName: string, items: any): GUIController;
      addColor(target: object, propName: string): GUIController;
      remove(controller: GUIController): void;
      destroy(): void;
    }
  
    interface GUIParams {
      autoPlace?: boolean;
      width?: number;
      closed?: boolean;
      load?: any;
      preset?: string;
      parent?: HTMLElement;
    }
  
    interface GUIController {
      onChange(callback: (value: any) => void): GUIController;
      onFinishChange(callback: (value: any) => void): GUIController;
      setValue(value: any): GUIController;
      getValue(): any;
      min(n: number): GUIController;
      max(n: number): GUIController;
      step(n: number): GUIController;
      updateDisplay(): GUIController;
      options(option: any): GUIController;
      name(name: string): GUIController;
      listen(): GUIController;
      remove(): void;
    }
  }
  