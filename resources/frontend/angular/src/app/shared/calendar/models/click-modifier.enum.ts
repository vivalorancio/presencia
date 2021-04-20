export enum ClickModifier {
  None,
  Click,
  ControlClick,
  ShiftClick,
  ShiftControlClick,
}

export interface CalendarSelectionClick {
  days: number[];
  click: ClickModifier;
}

export function GetClickModifier(event: MouseEvent): ClickModifier {
  if (event.ctrlKey) {
    if (event.shiftKey) {
      return ClickModifier.ShiftControlClick;
    }
    return ClickModifier.ControlClick;
  }
  if (event.shiftKey) {
    return ClickModifier.ShiftClick;
  }
  return ClickModifier.Click;
}
