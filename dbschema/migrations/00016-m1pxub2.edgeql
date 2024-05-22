CREATE MIGRATION m1pxub2mr4aoq2hdth253qyyxgb5lq5kpn3eunfss4u6oid2nxkxiq
    ONTO m1rexytfgfgbzc3mztlrswfdqojmdge6agurzdkaxlupbiorswjuiq
{
  ALTER TYPE default::Task {
      CREATE PROPERTY duedate: std::datetime;
  };
};
