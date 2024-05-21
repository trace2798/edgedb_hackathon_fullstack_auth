CREATE MIGRATION m1g7lakgu3dbz3uzpddxgy5oxo5eltly5rp2pvb2jmgzrgq2ajuvfa
    ONTO m1j2i7j2izfbnaixsuuiwxs2hu4f6phxiyoxmtyabexqoygovqjroq
{
  ALTER TYPE default::User {
      CREATE INDEX ON (.githubUsername);
  };
};
