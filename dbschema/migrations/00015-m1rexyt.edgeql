CREATE MIGRATION m1rexytfgfgbzc3mztlrswfdqojmdge6agurzdkaxlupbiorswjuiq
    ONTO m1oytld3u7grronn6pomjqnvbnlodzitshtddukmwp56qx4qvyws7q
{
  ALTER TYPE default::Task {
      DROP PROPERTY duedate;
  };
};
