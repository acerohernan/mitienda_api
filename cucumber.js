const common = [
  "--require-module ts-node/register", // Load TypeScript module
];

const mitiendaapp = [
  ...common,
  "tests/app/features/**/*.feature",
  "--require tests/app/features/step_definitions/*.steps.ts",
  "--publish-quiet",
].join(" ");

const play = [
  ...common,
  "play/**/*.feature",
  "--require play/step_definitions/*.steps.ts",
  "--publish-quiet",
].join(" ");

module.exports = {
  default: mitiendaapp,
};
