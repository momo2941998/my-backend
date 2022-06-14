// export interface Model_Socket {
//   id: string,
//   user_id: string,
//   device: string,
//   app_id: string,
// }

// export enum STATUS_CALL {
//   PENDING    = 'pending',
//   MISS       = 'miss',
//   ACCEPTED   = 'accept',
//   ERROR      = 'error',
//   CANCEL     = 'cancel',
//   REJECT     = 'reject',
//   END        = 'end',
// }

// export interface Model_Call {
//   id: string,
//   app_id: string,
//   from_user: string,
//   from_user_socket: string,
//   to_user: string,
//   to_user_socket: string,
//   to_hotline: string,
//   room_id: string,
//   status: STATUS_CALL,
//   created_time: Date | string,
//   start_time: Date | string,
//   end_time: Date| string,
//   /**
//    * current agent ringing
//    */
//   current_agent: string,
//   /**
//    * last agent send miss
//    */
//   last_miss_agent: string,
// }

// export enum USER_STATUS {
//   ONLINE = 'online',
//   BUSY = 'busy',
//   OFFLINE = 'offline'
// }

// export interface Model_User {
//   /**
//    *  User id: unique for each user
//    */
//   id: string, 

//   /**
//    *  status of user 'online' | 'busy' | 'offline' 
//    */
//   status: USER_STATUS

//   /**
//    *  call_id now
//    */
//   current_call: string,

//   /**
//    *  id call in request
//    */
//   request_call: string,

//   /**
//    *  last call user reject
//    */
//   last_reject_call: string,

//   /**
//    *  list sockets current connect to users
//    */
//   sockets: string[],

//   /**
//    *  app id
//    */
//   id_app: string,

//   /**
//    *  id in app
//    */
//   origin_id: string,
// }

export interface Model_App {
  id: string,
  api_key_secret: string,
  api_key_sid: string
}
// export interface Model_Hotline {
//   code: string
//   id_app: string,
//   id_queue: string, 
//   time_up: number
// }

// export type IsRecord = 1 | 0

// export enum QueueRule {
//   BROADCAST = 'broadcast',
//   SEQUENCE = 'sequence',
// }

// export enum Algorithm {
//   RANDOM = 'random',
//   ROUND_ROBIN = 'round_robin',
// }

// export type BroadcastQueueRule = {
//   type: QueueRule.BROADCAST
// }

// export type SequenceQueueRule = {
//   type: QueueRule.SEQUENCE,
//   algorithm: Algorithm,
//   loop_time: number,
// }
// export interface Model_Queue {
//   id: string,
//   size: number,
//   record: IsRecord,
//   id_groups: string[],
//   rule: BroadcastQueueRule | SequenceQueueRule
// }

// export interface Model_Queue_Redis {
//   id: string,
//   size: number,
//   record: IsRecord,
//   id_groups: string[],
//   wait_time: number,
//   rule: QueueRule,
//   algorithm: Algorithm,
// }

