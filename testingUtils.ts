import { ShallowWrapper } from "enzyme";

export function findByTestAtrr<T>(
  component: ShallowWrapper<any, any, T>,
  attr: string
) {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
}

export function getEventTargetClassList(classList: string[]) {
  return {
    target: { classList }
  };
}
