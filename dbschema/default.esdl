using extension auth;
using extension ai;

module default {
  scalar type Role extending enum<admin, user>;
  scalar type MemberRole extending enum<admin, member, owner>;
  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

 type User {
    required identity: ext::auth::Identity;
    required name: str;
    email: str;
    required githubUsername: str {
      constraint exclusive;
    };
    required avatarUrl: str;
  
    userRole: Role {
      default := "user";
    };

    created: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    updated: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    multi workspaces := .<user[is Workspace];
    multi workspaceMembers := .<user[is WorkspaceMember];
    index on (.githubUsername)
  }

  type Workspace {
    required name: str;
    description: str;
    required userId := .user.id;
    created: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    updated: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required link user -> User;
    multi workspaceMembers := .<workspace[is WorkspaceMember];
    multi activities := .<workspace[is Activity];
    multi tasks := .<workspace[is Task]
  }

  type WorkspaceMember {
    githubUsername: str;
    required userId := .user.id;
    required workspaceId := .workspace.id;
      created: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    updated: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    memberRole: MemberRole {
      default := "member";
    }
    required link user -> User;
    required link workspace -> Workspace {
      on target delete delete source;
    }
    multi tasks := .<workspaceMember[is Task]
  }

  type Activity {
    message: str;
    required workspaceId := .workspace.id;
    created: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    updated: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required link workspace -> Workspace {
      on target delete delete source;
    }
    index on (.workspace);
  }

  type Task {
      required title: str;
      required status: str {
        default := "todo";
        index on (.status);
      }
      description: str;
      duedate: cal::local_datetime;
      required priority: str {
        default := "no priority";
        index on (.priority);
      }
      required workspaceId := .workspace.id;
      created: cal::local_datetime {
        default := cal::to_local_datetime(datetime_current(), 'UTC');
      }
      updated: cal::local_datetime {
        default := cal::to_local_datetime(datetime_current(), 'UTC');
      }
      required link workspace -> Workspace {
        on target delete delete source;
      }
      assigneeId: uuid;
      required link workspaceMember -> WorkspaceMember;
      multi taskactivities := .<task[is TaskActivity];
      multi websiteaddresses := .<task[is WebsiteAddress];
      index on (.workspace);
  }

   type WebsiteAddress {
      required url: str;
      description: str;
      required link task -> Task {
        on target delete delete source;
      }
    index on (.task)
  }


   type TaskActivity {
      required message: str;
      required link task -> Task {
        on target delete delete source;
      }
      created: cal::local_datetime {
        default := cal::to_local_datetime(datetime_current(), 'UTC');
      }
      updated: cal::local_datetime {
        default := cal::to_local_datetime(datetime_current(), 'UTC');
      }
  }

}
