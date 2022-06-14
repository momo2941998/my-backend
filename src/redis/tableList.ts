export const tableList = {
  // store information of users, use [id:{prefix}] HASH
  USERS: 'user',

  // hotlines table 
  HOTLINES: 'hotline',

  // apps table
  APPS: 'app',

  // queues table
  QUEUES: 'queue',

  // groups table
  GROUPS: 'group',

  // call between two user
  CALLS: 'call',

  SOCKETS: 'socket',

  HISTORY_CALLS: 'history_call',

  LIVE_QUEUES: 'live_queue',

  ROUND_ROBIN: 'round_robin',
  
  // store index of call, use SET
  ID_CALLS: 'id_call',

  // store index of call, use SET
  ID_CALL_HOTLINE: 'id_call_hotline',
  // store index of users, use SET
  ID_USERS: 'id_user',
  // store index of hotlines, use SET
  ID_HOTLINES: 'id_hotline',
  // store index of apps, use SET
  ID_APPS: 'id_app',
  // store indext of socket, use SET
  ID_SOCKETS: 'id_socket',
  // store index of Job, use SET
  ID_JOB_NEWCALL: 'id_job_newcall',
}