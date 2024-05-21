CREATE MIGRATION m1fsrt77n4ocnwtwfmzjiam3u455exkgn7wuphd5qjoxq43spbxuqa
    ONTO m1nmjsd2nfgimmvuzixetnqrat36bvc2dbysu47u7jo3toaf4sj4qq
{
  ALTER TYPE default::WorkspaceMember {
      ALTER LINK workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
