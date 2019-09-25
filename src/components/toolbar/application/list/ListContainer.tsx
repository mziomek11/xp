import React from "react";
import { connect } from "react-redux";

import ApplicationList from "./List";
import { RootState } from "MyTypes";
import { WindowById } from "../../../../store/window/models";
import { toolbarConfig } from "../../../../config";

type AppNamesWithIds = { [appName: string]: string[] };

type StateProps = {
  windowById: WindowById;
  openWindowCount: number;
};

type State = {
  spaceForApps: number;
  maxAppsWithDefaultWidth: number;
};

export class ApplicationsListContainer extends React.Component<
  StateProps,
  State
> {
  readonly state: State = {
    maxAppsWithDefaultWidth: 0,
    spaceForApps: 0
  };

  shouldComponentUpdate(nextProps: StateProps, nextState: State) {
    return (
      this.props.openWindowCount !== nextProps.openWindowCount ||
      nextState.maxAppsWithDefaultWidth !== this.state.maxAppsWithDefaultWidth
    );
  }

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = () => {
    const { APP_WIDTH, START_WIDTH, TIME_WIDTH } = toolbarConfig;
    const spaceForApps: number = window.innerWidth - TIME_WIDTH - START_WIDTH;
    let maxAppsWithDefaultWidth = Math.floor(spaceForApps / APP_WIDTH);
    maxAppsWithDefaultWidth = Math.max(maxAppsWithDefaultWidth, 1);

    this.setState({ maxAppsWithDefaultWidth, spaceForApps });
  };

  createRenderData = (): [string[], AppNamesWithIds, number] => {
    const appsOver = this.calculateAppsOver();
    const applicationNameWithIds = this.getAppsNamesWithIds();
    const [single, multi, over] = this.divideAppsIntoSingleAndMultiple(
      appsOver,
      applicationNameWithIds
    );
    const anyAppOver = over > 0;
    const appWidth = this.calculateAppWidth(anyAppOver, single, multi);

    return [single, multi, appWidth];
  };

  calculateAppsOver = (): number => {
    return this.props.openWindowCount - this.state.maxAppsWithDefaultWidth;
  };

  getAppsNamesWithIds = (): AppNamesWithIds => {
    const idsByApplicatioNames: AppNamesWithIds = {};
    const { windowById } = this.props;
    Object.keys(windowById).forEach(key => {
      const { application, id } = windowById[key];
      if (!idsByApplicatioNames[application]) {
        idsByApplicatioNames[application] = [id];
      } else idsByApplicatioNames[application].push(id);
    });

    return idsByApplicatioNames;
  };

  divideAppsIntoSingleAndMultiple = (
    startappsOver: number,
    appNamesWithIds: AppNamesWithIds
  ): [string[], AppNamesWithIds, number] => {
    const openedApps: string[] = this.sortAppsByOpenedWindows(appNamesWithIds);
    let appsOver: number = startappsOver;
    let singleIds: string[] = [];

    openedApps.forEach(app => {
      if (appsOver <= 0) {
        singleIds = [...singleIds, ...appNamesWithIds[app]];
        delete appNamesWithIds[app];
      } else if (appNamesWithIds[app].length === 1) {
        singleIds.push(appNamesWithIds[app][0]);
        delete appNamesWithIds[app];
      } else appsOver -= appNamesWithIds[app].length - 1;
    });

    return [singleIds, appNamesWithIds, appsOver];
  };

  sortAppsByOpenedWindows = (appNamesWithIds: AppNamesWithIds): string[] => {
    return Object.keys(appNamesWithIds).sort(
      (a, b) => appNamesWithIds[b].length - appNamesWithIds[a].length
    );
  };

  calculateAppWidth = (
    anyAppOver: boolean,
    single: string[],
    multi: AppNamesWithIds
  ): number => {
    if (!anyAppOver) return toolbarConfig.APP_WIDTH;

    const appsCount = single.length + Object.keys(multi).length;
    return this.state.spaceForApps / appsCount;
  };

  render() {
    const [single, multiple, width] = this.createRenderData();

    return (
      <ApplicationList
        appWidth={width}
        singleApps={single}
        multipleApps={multiple}
        data-test="list"
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  windowById: state.window.byId,
  openWindowCount: state.window.allIds.length
});

export default connect(mapStateToProps)(ApplicationsListContainer);
