import Activity from "./Activity";

export default interface Visitor {
  visitActivity(activity: Activity): void;
}
