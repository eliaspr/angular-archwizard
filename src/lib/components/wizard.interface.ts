import {WizardStep} from "../util/wizard-step.interface";
import {MovingDirection} from "../util/moving-direction.enum";
import {EventEmitter} from "@angular/core";

export interface IWizardComponent {
  get defaultStepIndex(): number;
  currentStepIndex: number;
  get currentStep(): WizardStep;
  navBarDirection: string;
  get wizardSteps(): WizardStep[];
  get completed(): boolean;
  disableNavigationBar: boolean;
  isNavigable(destinationIndex: number): boolean;
  getIndexOfStep(step: WizardStep): number;
  getIndexOfStepWithId(stepId: string): number;
  hasStep(stepIndex: number): boolean;
  getMovingDirection(destinationStep: number): MovingDirection;
  getStepAtIndex(stepIndex: number): WizardStep;
  goToStep(destinationIndex: number, preFinalize?: EventEmitter<void>, postFinalize?: EventEmitter<void>): void;
}
