// GENERATED by @edgedb/generate v0.5.3

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _cal from "./cal";
import type * as _extauth from "./ext/auth";
export type $MemberRole = {
  "admin": $.$expr_Literal<$MemberRole>;
  "member": $.$expr_Literal<$MemberRole>;
  "owner": $.$expr_Literal<$MemberRole>;
} & $.EnumType<"default::MemberRole", ["admin", "member", "owner"]>;
const MemberRole: $MemberRole = $.makeType<$MemberRole>(_.spec, "7f8c743d-1788-11ef-8962-a5cf26430c6a", _.syntax.literal);

export type $Role = {
  "admin": $.$expr_Literal<$Role>;
  "user": $.$expr_Literal<$Role>;
} & $.EnumType<"default::Role", ["admin", "user"]>;
const Role: $Role = $.makeType<$Role>(_.spec, "f8eec2f7-173b-11ef-accd-5986d958bd74", _.syntax.literal);

export type $ActivityλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "message": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "<activities[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<activities": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Activity = $.ObjectType<"default::Activity", $ActivityλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Activity = $.makeType<$Activity>(_.spec, "e6c8032b-1790-11ef-ab4d-1b4b9fca96b3", _.syntax.literal);

const Activity: $.$expr_PathNode<$.TypeSet<$Activity, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Activity, $.Cardinality.Many), null);

export type $BoardλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "workspaceMember": $.LinkDesc<$WorkspaceMember, $.Cardinality.One, {}, false, false,  false, false>;
  "backgroundImage": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "lists": $.LinkDesc<$List, $.Cardinality.Many, {}, false, true,  false, false>;
  "<boards[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<boards[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<board[is List]": $.LinkDesc<$List, $.Cardinality.Many, {}, false, false,  false, false>;
  "<board": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<boards": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Board = $.ObjectType<"default::Board", $BoardλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Board = $.makeType<$Board>(_.spec, "400b4297-1809-11ef-89de-0338c7b80a4e", _.syntax.literal);

const Board: $.$expr_PathNode<$.TypeSet<$Board, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Board, $.Cardinality.Many), null);

export type $CardλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "priority": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, true>;
  "list": $.LinkDesc<$List, $.Cardinality.One, {}, false, false,  false, false>;
  "status": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, true>;
  "listId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "assigneeId": $.PropertyDesc<_std.$uuid, $.Cardinality.AtMostOne, false, false, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "duedate": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "order": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "<cards[is List]": $.LinkDesc<$List, $.Cardinality.Many, {}, false, false,  false, false>;
  "<cards": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Card = $.ObjectType<"default::Card", $CardλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Card = $.makeType<$Card>(_.spec, "1ab7b80c-1814-11ef-bc28-a5690fb5c95a", _.syntax.literal);

const Card: $.$expr_PathNode<$.TypeSet<$Card, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Card, $.Cardinality.Many), null);

export type $ListλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "board": $.LinkDesc<$Board, $.Cardinality.One, {}, false, false,  false, false>;
  "boardId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "order": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "cards": $.LinkDesc<$Card, $.Cardinality.Many, {}, false, true,  false, false>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "<lists[is Board]": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, false,  false, false>;
  "<list[is Card]": $.LinkDesc<$Card, $.Cardinality.Many, {}, false, false,  false, false>;
  "<lists[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<list": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<lists": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $List = $.ObjectType<"default::List", $ListλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $List = $.makeType<$List>(_.spec, "00387e55-1813-11ef-939f-f9159a605a5b", _.syntax.literal);

const List: $.$expr_PathNode<$.TypeSet<$List, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($List, $.Cardinality.Many), null);

export type $TaskλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "priority": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, true>;
  "status": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, true>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "workspaceMember": $.LinkDesc<$WorkspaceMember, $.Cardinality.One, {}, false, false,  false, false>;
  "assigneeId": $.PropertyDesc<_std.$uuid, $.Cardinality.AtMostOne, false, false, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "taskactivities": $.LinkDesc<$TaskActivity, $.Cardinality.Many, {}, false, true,  false, false>;
  "websiteaddresses": $.LinkDesc<$WebsiteAddress, $.Cardinality.Many, {}, false, true,  false, false>;
  "duedate": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "<tasks[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tasks[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<task[is TaskActivity]": $.LinkDesc<$TaskActivity, $.Cardinality.Many, {}, false, false,  false, false>;
  "<task[is WebsiteAddress]": $.LinkDesc<$WebsiteAddress, $.Cardinality.Many, {}, false, false,  false, false>;
  "<task": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tasks": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Task = $.ObjectType<"default::Task", $TaskλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Task = $.makeType<$Task>(_.spec, "aa49d9c3-1795-11ef-8c90-2547ca16a380", _.syntax.literal);

const Task: $.$expr_PathNode<$.TypeSet<$Task, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Task, $.Cardinality.Many), null);

export type $TaskActivityλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "task": $.LinkDesc<$Task, $.Cardinality.One, {}, false, false,  false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "message": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "<taskactivities[is Task]": $.LinkDesc<$Task, $.Cardinality.Many, {}, false, false,  false, false>;
  "<taskactivities": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $TaskActivity = $.ObjectType<"default::TaskActivity", $TaskActivityλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $TaskActivity = $.makeType<$TaskActivity>(_.spec, "5adf1e6a-179e-11ef-b883-0fef70a85ca4", _.syntax.literal);

const TaskActivity: $.$expr_PathNode<$.TypeSet<$TaskActivity, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($TaskActivity, $.Cardinality.Many), null);

export type $UserλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "identity": $.LinkDesc<_extauth.$Identity, $.Cardinality.One, {}, false, false,  false, false>;
  "avatarUrl": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "githubUsername": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "userRole": $.PropertyDesc<$Role, $.Cardinality.AtMostOne, false, false, false, true>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "workspaces": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, true,  false, false>;
  "workspaceMembers": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, true,  false, false>;
  "<user[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {githubUsername: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $User = $.makeType<$User>(_.spec, "f8eecf20-173b-11ef-99ee-077a2226c534", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);

export type $WebsiteAddressλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "task": $.LinkDesc<$Task, $.Cardinality.One, {}, false, false,  false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "url": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<websiteaddresses[is Task]": $.LinkDesc<$Task, $.Cardinality.Many, {}, false, false,  false, false>;
  "<websiteaddresses": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $WebsiteAddress = $.ObjectType<"default::WebsiteAddress", $WebsiteAddressλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $WebsiteAddress = $.makeType<$WebsiteAddress>(_.spec, "ea4b082e-17a1-11ef-9d8c-9f4bee91c5f7", _.syntax.literal);

const WebsiteAddress: $.$expr_PathNode<$.TypeSet<$WebsiteAddress, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($WebsiteAddress, $.Cardinality.Many), null);

export type $WorkspaceλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "workspaceMembers": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, true,  false, false>;
  "activities": $.LinkDesc<$Activity, $.Cardinality.Many, {}, false, true,  false, false>;
  "tasks": $.LinkDesc<$Task, $.Cardinality.Many, {}, false, true,  false, false>;
  "boards": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, true,  false, false>;
  "lists": $.LinkDesc<$List, $.Cardinality.Many, {}, false, true,  false, false>;
  "<workspaces[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaces[is current_user]": $.LinkDesc<$current_user, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is Activity]": $.LinkDesc<$Activity, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is Task]": $.LinkDesc<$Task, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is Board]": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is List]": $.LinkDesc<$List, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaces": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Workspace = $.ObjectType<"default::Workspace", $WorkspaceλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Workspace = $.makeType<$Workspace>(_.spec, "4b6624ef-1781-11ef-bcab-718c3bf79eec", _.syntax.literal);

const Workspace: $.$expr_PathNode<$.TypeSet<$Workspace, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Workspace, $.Cardinality.Many), null);

export type $WorkspaceMemberλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "memberRole": $.PropertyDesc<$MemberRole, $.Cardinality.AtMostOne, false, false, false, true>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "githubUsername": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "tasks": $.LinkDesc<$Task, $.Cardinality.Many, {}, false, true,  false, false>;
  "boards": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, true,  false, false>;
  "<workspaceMembers[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMembers[is current_user]": $.LinkDesc<$current_user, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMembers[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMember[is Task]": $.LinkDesc<$Task, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMember[is Board]": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMember": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMembers": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $WorkspaceMember = $.ObjectType<"default::WorkspaceMember", $WorkspaceMemberλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $WorkspaceMember = $.makeType<$WorkspaceMember>(_.spec, "7f8c815d-1788-11ef-974e-dd888a591aee", _.syntax.literal);

const WorkspaceMember: $.$expr_PathNode<$.TypeSet<$WorkspaceMember, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($WorkspaceMember, $.Cardinality.Many), null);

export type $current_userλShape = $.typeutil.flatten<$UserλShape & {
}>;
type $current_user = $.ObjectType<"default::current_user", $current_userλShape, null, [
  ...$User['__exclusives__'],
]>;
const $current_user = $.makeType<$current_user>(_.spec, "f8fbcf14-173b-11ef-a058-27660afaaf89", _.syntax.literal);

const current_user: $.$expr_PathNode<$.TypeSet<$current_user, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($current_user, $.Cardinality.Many), null);

const $default__globals: {  current_user: _.syntax.$expr_Global<
              // "default::current_user",
              $current_user,
              $.Cardinality.AtMostOne
              >} = {  current_user: _.syntax.makeGlobal(
              "default::current_user",
              $.makeType(_.spec, "f8fbcf14-173b-11ef-a058-27660afaaf89", _.syntax.literal),
              $.Cardinality.AtMostOne) as any};



export { MemberRole, Role, $Activity, Activity, $Board, Board, $Card, Card, $List, List, $Task, Task, $TaskActivity, TaskActivity, $User, User, $WebsiteAddress, WebsiteAddress, $Workspace, Workspace, $WorkspaceMember, WorkspaceMember, $current_user, current_user };

type __defaultExports = {
  "MemberRole": typeof MemberRole;
  "Role": typeof Role;
  "Activity": typeof Activity;
  "Board": typeof Board;
  "Card": typeof Card;
  "List": typeof List;
  "Task": typeof Task;
  "TaskActivity": typeof TaskActivity;
  "User": typeof User;
  "WebsiteAddress": typeof WebsiteAddress;
  "Workspace": typeof Workspace;
  "WorkspaceMember": typeof WorkspaceMember;
  "current_user": typeof current_user;
  "global": typeof $default__globals
};
const __defaultExports: __defaultExports = {
  "MemberRole": MemberRole,
  "Role": Role,
  "Activity": Activity,
  "Board": Board,
  "Card": Card,
  "List": List,
  "Task": Task,
  "TaskActivity": TaskActivity,
  "User": User,
  "WebsiteAddress": WebsiteAddress,
  "Workspace": Workspace,
  "WorkspaceMember": WorkspaceMember,
  "current_user": current_user,
  "global": $default__globals
};
export default __defaultExports;
