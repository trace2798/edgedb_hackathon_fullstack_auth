CREATE MIGRATION m1mbpbebw2eke2scgtltkkdldfbeoh4lu45guqkcn3wzjkke65xwja
    ONTO m1fsrt77n4ocnwtwfmzjiam3u455exkgn7wuphd5qjoxq43spbxuqa
{
  CREATE TYPE default::Task {
      CREATE REQUIRED PROPERTY priority: std::str {
          SET default := 'no priority';
      };
      CREATE INDEX ON (.priority);
      CREATE REQUIRED PROPERTY status: std::str {
          SET default := 'todo';
      };
      CREATE INDEX ON (.status);
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.workspace);
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
      CREATE REQUIRED LINK workspaceMember: default::WorkspaceMember;
      CREATE PROPERTY assigneeId: std::uuid;
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY duedate: cal::local_datetime;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK tasks := (.<workspace[IS default::Task]);
  };
  ALTER TYPE default::WorkspaceMember {
      CREATE MULTI LINK tasks := (.<workspaceMember[IS default::Task]);
  };
};
