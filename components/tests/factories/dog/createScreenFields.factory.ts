import {
  QuestionnaireScreenFields,
  QuestionnaireScreenName,
} from '../../../../entities/questionnaire.entities';

export function createScreenFields(
  options: QuestionnaireScreenFields
): QuestionnaireScreenFields {
  return {
    step: options.step,
    previousScreen: options.previousScreen,
    nextScreen: options.nextScreen,
    isCompleted: options.isCompleted,
  };
}
