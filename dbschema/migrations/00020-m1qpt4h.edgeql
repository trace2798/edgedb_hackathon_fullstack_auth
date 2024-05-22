CREATE MIGRATION m1qpt4htata6qokutm7d7fkwneus23mbvrlzdoyxu2k73ygxe4ddvq
    ONTO m1du62oxiey3kvvfjyx5p5gjckpwmtfpdejor7zfy6h5g7sqcsomlq
{
  ALTER TYPE default::List {
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
          SET REQUIRED USING (<default::Workspace>{});
      };
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK lists := (.<workspace[IS default::List]);
  };
};
