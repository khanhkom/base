import { HttpException, HttpStatus } from "@nestjs/common"
import { SERVICE_CODE } from "src/shared/constant"
import { HttpError } from "./errors"

export const ErrorGroups = {
  General: "001",
  Auth: "002",
  Pin: "003",
  Mandrill: "004",
  S3: "005",
  Twilio: "006",
  OAuth: "007",
  Customer: "008",
  Doctor: "009",
  FileSize: "010",
  Specialist: "011",
  Order: "012",
  Otp: "013",
  Zns: "014",
  Patient: "015",
  Rating: "016",
  Result: "017",
  Stringee: "018",
  Roles: "019",
  Firebase: "020",
}

export const getErrorCode = (serviceId: string, errorGroup: string, errorNumber: string) => {
  return `${serviceId}${errorGroup}${errorNumber}`
}

export const Errors = {
  USER_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "001"),
    HttpStatus.NOT_FOUND,
    "User not found",
  ),
  USER_ALREADY_EXISTED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "002"),
    HttpStatus.BAD_REQUEST,
    "User already existed",
  ),
  CAN_NOT_CREATE_ROOT_ACCOUNT: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "003"),
    HttpStatus.BAD_REQUEST,
    "Can not create root account",
  ),
  CAN_NOT_CREATE_USER_WITH_HIGHER_OR_EQUAL_ROLE: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "004"),
    HttpStatus.NOT_FOUND,
    "Can not create user with higher or equal role",
  ),
  ACCOUNT_IS_DEACTIVE: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "005"),
    HttpStatus.FORBIDDEN,
    "Account is deactive",
  ),
  USER_NAME_OR_PASSWORD_IS_INVALID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "006"),
    HttpStatus.BAD_REQUEST,
    "User name or password is invalid",
  ),
  TOKEN_IS_INVALID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "007"),
    HttpStatus.BAD_REQUEST,
    "Token is invalid",
  ),
  SESSION_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "008"),
    HttpStatus.NOT_FOUND,
    "Session not found",
  ),
  NOT_VALID_OBJECT_ID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.General, "009"),
    HttpStatus.BAD_REQUEST,
    "Not valid objectId",
  ),
  VERIFY_ID_TOKEN_FAIL: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "010"),
    HttpStatus.BAD_REQUEST,
    "Verify id token fail",
  ),
  OAUTH_TOKEN_NOT_VALID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "011"),
    HttpStatus.BAD_REQUEST,
    "Oauth token not valid",
  ),
  GENERAL_VALIDATION_EXCEPTIONS: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.General, "012"),
    HttpStatus.BAD_REQUEST,
    "General validation exceptions",
  ),
  WRONG_OTP: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "013"),
    HttpStatus.BAD_REQUEST,
    "Wrong otp",
  ),
  MANDRILL_MESSAGE_CANNOT_BE_EMPTY: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Mandrill, "014"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Mandrill message cannot be empty!",
  ),
  NO_REPORT_WITH_THIS_KEY: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.S3, "015"),
    HttpStatus.NOT_FOUND,
    "No report with this key",
  ),
  GET_OBJECT_SIGNED_URL_FAILED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.S3, "016"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Get object signed url failed",
  ),
  GET_OBJECT_S3_FAILED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.S3, "017"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Get object s3 failed",
  ),
  GET_OBJECT_STREAM_FROM_S3_FAIL: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.S3, "018"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Get object stream from S3 fail",
  ),
  TWILIO_SEND_OTP_FAIL: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Twilio, "019"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Send Otp fail",
  ),
  OAUTH_CLIENT_UNKNOWN: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.OAuth, "020"),
    HttpStatus.BAD_REQUEST,
    "OAuth client unknown",
  ),
  GET_FACEBOOK_APP_TOKEN_FAILED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.OAuth, "021"),
    HttpStatus.BAD_GATEWAY,
    "Get facebook app token failed",
  ),
  VERIFY_FACEBOOK_USER_TOKEN_FAILED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.OAuth, "022"),
    HttpStatus.BAD_GATEWAY,
    "Verify facebook user token failed",
  ),
  CONNECTION_GOOGLE_TIMEOUT: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.OAuth, "023"),
    HttpStatus.BAD_GATEWAY,
    "Connection timeout",
  ),
  CUSTOMER_ID_MUST_BE_VALID_OBJECT_ID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Customer, "024"),
    HttpStatus.BAD_REQUEST,
    "Customer id must be valid object id",
  ),
  USER_NOT_FOUND_IN_CUSTOMER_SERVICE: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Customer, "025"),
    HttpStatus.BAD_REQUEST,
    "User not found",
  ),
  USER_ID_MUST_BE_VALID_OBJECT_ID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Customer, "026"),
    HttpStatus.BAD_REQUEST,
    "User id must be a objectId",
  ),
  PATIENT_ID_MUST_BE_VALID_OBJECT_ID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Customer, "027"),
    HttpStatus.BAD_REQUEST,
    "Patient id must be a objectId",
  ),

  FILE_MUST_BE_BELOW_MAXSIZE: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "028"),
    HttpStatus.BAD_REQUEST,
    "File must be below maxsize",
  ),
  DOCTOR_PROFILE_FOR_THIS_USER_ALREADY_EXISTS: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "029"),
    HttpStatus.BAD_REQUEST,
    "Doctor profile for this user already exists",
  ),
  DOCTOR_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "030"),
    HttpStatus.BAD_REQUEST,
    "Doctor not found",
  ),
  UPLOAD_FILE_DOCTOR_ERROR: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "031"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Upload file error",
  ),
  GET_FILE_DOCTOR_ERROR: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "032"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Get file error",
  ),
  DELETE_FILE_DOCTOR_ERROR: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "033"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Delete file error",
  ),
  PROFILE_FOR_THIS_DOCTOR_DOES_NOT_EXISTS: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "034"),
    HttpStatus.BAD_REQUEST,
    "Profile for this doctor does not exist",
  ),
  FILE_FORMAT_NOT_SUPPORTED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "035"),
    HttpStatus.UNPROCESSABLE_ENTITY,
    "File format not supported",
  ),
  TIME_FROM_IS_INVALID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "036"),
    HttpStatus.BAD_REQUEST,
    "Time from is invalid",
  ),
  TIME_TO_IS_INVALID: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "037"),
    HttpStatus.BAD_REQUEST,
    "Time to is invalid",
  ),
  TIME_TO_MUST_BE_AFTER_TIME_FROM: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Doctor, "038"),
    HttpStatus.BAD_REQUEST,
    "Time to must be after Time from",
  ),
  FILE_MUST_BELOW_10MB: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.FileSize, "039"),
    HttpStatus.BAD_REQUEST,
    "File must below 10mb",
  ),
  SPECIALIST_FOR_THIS_CODE_DOES_NOT_EXISTS: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Specialist, "40"),
    HttpStatus.BAD_REQUEST,
    "Specialist for this code does not exists",
  ),
  CREATE_ORDER_FAIL: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "41"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Create order fail",
  ),
  ORDER_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "42"),
    HttpStatus.BAD_REQUEST,
    "Order not found",
  ),
  CAN_NOT_EDIT_ORDER_AFTER_EXAMINE: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "43"),
    HttpStatus.BAD_REQUEST,
    "Can not edit order after examine",
  ),
  CAN_NOT_CANCEL_ORDER_AFTER_EXAMINE: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "44"),
    HttpStatus.BAD_REQUEST,
    "Can not cancel order after examine",
  ),
  WRONG_STATUS_UPDATE: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "45"),
    HttpStatus.BAD_REQUEST,
    "Wrong status update",
  ),
  CANNOT_CREATE_ORDER_IN_THE_PAST_TIME: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "46"),
    HttpStatus.BAD_REQUEST,
    "Cannot create order in the past time",
  ),
  CANNOT_CREATE_ORDER_BECAUSE_DOCTOR_IS_BUSY_IN_THIS_TIME: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "47"),
    HttpStatus.BAD_REQUEST,
    "Cannot create order because doctor is busy in this time",
  ),
  ROLE_NOT_SUPPORTED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "48"),
    HttpStatus.BAD_REQUEST,
    "Role not supported",
  ),
  TIME_FROM_IS_INVALID_IN_ORDER: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "49"),
    HttpStatus.BAD_REQUEST,
    "Time from is invalid",
  ),
  TIME_TO_IS_INVALID_IN_ORDER: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "50"),
    HttpStatus.BAD_REQUEST,
    "Time to is invalid",
  ),
  TIME_FROM_MUST_BE_VALID_AND_TIME_TO_MUST_BE_AFTER_TIME_FROM_15_MINUTES: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Order, "51"),
    HttpStatus.BAD_REQUEST,
    "Time from must be valid and Time to must be after Time from 15 minutes",
  ),
  OTP_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Otp, "52"),
    HttpStatus.BAD_REQUEST,
    "Not found otp for this phone",
  ),
  OTP_EXPIRED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Otp, "53"),
    HttpStatus.BAD_REQUEST,
    "Otp expired",
  ),
  OTP_NOT_MATCHED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Otp, "54"),
    HttpStatus.BAD_REQUEST,
    "Otp not matched",
  ),
  TOO_MANY_RETRIES_OTP: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Otp, "55"),
    HttpStatus.TOO_MANY_REQUESTS,
    "Too many retries otp",
  ),
  NOT_SUPPORT_THIS_METHOD: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Otp, "56"),
    HttpStatus.BAD_REQUEST,
    "Not support this method",
  ),
  TOO_MANY_REQUEST_OTP: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Otp, "57"),
    HttpStatus.TOO_MANY_REQUESTS,
    "Too many request otp",
  ),
  ZNS_NOT_CONNECTED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Zns, "58"),
    HttpStatus.BAD_GATEWAY,
    "Zns not connected",
  ),
  SEND_ZALO_OTP_ERROR: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Zns, "59"),
    HttpStatus.BAD_REQUEST,
    "Send zalo OTP error",
  ),
  PATIENT_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Patient, "60"),
    HttpStatus.BAD_REQUEST,
    "Patient not found",
  ),
  PATIENT_UPLOAD_FILE_FAILED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Patient, "61"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Upload file failed",
  ),
  ENDPOINT_USE_FOR_PATIENT_ONLY: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "62"),
    HttpStatus.BAD_REQUEST,
    "Endpoint use for patient only",
  ),
  PHONE_EXISTED_IN_SYSTEM: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "63"),
    HttpStatus.BAD_REQUEST,
    "Phone existed in system",
  ),
  CAN_NOT_CREATE_SESSION_BECAUSE_THIS_PHONE_IS_USE_FOR_A_DIFFERENT_ACCOUNT_WITH_OAUTH_ACCOUNT:
    new HttpError(
      getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "64"),
      HttpStatus.BAD_REQUEST,
      "Can not create session because this phone is use for a different account with oauth account",
    ),
  PHONE_NOT_EXISTED_IN_SYSTEM: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "65"),
    HttpStatus.BAD_REQUEST,
    "Phone not existed in system",
  ),
  USER_NOT_EXISTED_IN_PIN: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "66"),
    HttpStatus.BAD_REQUEST,
    "user not existed",
  ),
  MISSING_TOKEN: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "67"),
    HttpStatus.BAD_REQUEST,
    "Missing token",
  ),
  USER_ALREADY_VERIFIED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "68"),
    HttpStatus.BAD_REQUEST,
    "User already verified",
  ),
  PHONE_NOT_MATCH_WITH_ACCOUNT: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Pin, "69"),
    HttpStatus.BAD_REQUEST,
    "Phone not match with account",
  ),
  CAN_NOT_CREATE_RATING_FOR_NON_SUCCESS_ORDER: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Rating, "70"),
    HttpStatus.BAD_REQUEST,
    "Can not create rating for non success order",
  ),
  RATING_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Rating, "71"),
    HttpStatus.BAD_REQUEST,
    "Rating not found",
  ),
  USER_CAN_NOT_CREATE_RESULT_FOR_THIS_ORDER: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Result, "72"),
    HttpStatus.BAD_REQUEST,
    "User can not create result for this order",
  ),
  CREATE_RESULT_FAILED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Result, "73"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Create result fail",
  ),
  RESULT_NOT_FOUND: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Result, "74"),
    HttpStatus.BAD_REQUEST,
    "Result not found",
  ),
  CREATE_SCCOS_ERROR: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Stringee, "75"),
    HttpStatus.BAD_REQUEST,
    "Create SCCOS error",
  ),
  TO_PHONE_IS_WRONG_FORMAT: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Stringee, "76"),
    HttpStatus.BAD_REQUEST,
    "To phone is wrong format",
  ),
  USER_NOT_ALLOW_TO_CALL_IN_THIS_TIME: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Stringee, "77"),
    HttpStatus.BAD_REQUEST,
    "User not allow to call in this time",
  ),
  CANNOT_EXTRACT_USER_FROM_REQUEST: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Roles, "78"),
    HttpStatus.UNAUTHORIZED,
    "Cannot extract user from request",
  ),
  ROLES_GUARD_UNAUTHORIZED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Roles, "79"),
    HttpStatus.UNAUTHORIZED,
    "Roles guard unauthorized",
  ),
  CREATE_FIREBASE_USER_FAILED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Firebase, "80"),
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Create firebase user failed",
  ),
  USER_FIREBASE_UNKNOWN: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Firebase, "81"),
    HttpStatus.BAD_REQUEST,
    "user firebase unknown",
  ),
  CAN_NOT_DELETE_OAUTH: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "082"),
    HttpStatus.NOT_FOUND,
    "Can not delete OAuth",
  ),
  PHONE_NUMBER_HAS_BEEN_USED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "083"),
    HttpStatus.CONFLICT,
    "Phone number has been used",
  ),
  USER_HAS_ADDED_A_PHONE_NUMBER_ALREADY: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "083"),
    HttpStatus.FORBIDDEN,
    "User has added a phone number already",
  ),
  PHONE_NUMBER_IS_DIFFERENT_FROM_FIREBASE_PHONE_NUMBER: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "085"),
    HttpStatus.CONFLICT,
    "Phone number is different from firebase phone number",
  ),
  PHONE_IS_REQUIRED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "086"),
    HttpStatus.BAD_REQUEST,
    "Phone is required",
  ),
  USERNAME_IS_REQUIRED: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "087"),
    HttpStatus.BAD_REQUEST,
    "UserName is required",
  ),
  ONLY_PATIENT_CAN_LOG_IN_THIS_APP: new HttpError(
    getErrorCode(SERVICE_CODE, ErrorGroups.Auth, "088"),
    HttpStatus.FORBIDDEN,
    "Only patient can log in this app",
  ),
}

export const throwExceptions = (
  httpError: HttpError,
  descriptions?: string | string[],
  extraData?: unknown,
) => {
  throw new HttpException(
    {
      message: httpError.message,
      errorCode: httpError.errorCode,
      descriptions,
      extraData,
    },
    httpError.httpStatus,
  )
}
