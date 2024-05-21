CREATE MIGRATION m1nmjsd2nfgimmvuzixetnqrat36bvc2dbysu47u7jo3toaf4sj4qq
    ONTO m1stuvjfwnwoet63xtmotosjlqibsij4tgicrae37vnon5lr2c2tga
{
  ALTER TYPE default::Activity {
      CREATE INDEX ON (.workspace);
  };
};
