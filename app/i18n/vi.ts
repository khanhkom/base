const vi = {
  common: {
    ok: "OK!",
    cancel: "Hủy",
    back: "Thoát",
    logOut: "Đăng xuất", // @demo remove-current-line
    loading: "Đang tải",
    its_over: "Đã hết",
    provide_complete_information: "Vui lòng nhập đủ thông tin!",
    oops_error: "Có lỗi xảy ra! Vui lòng thử lại",
    close: "Đóng",
    phonenumber: "Số điện thoại",
    not: "chưa",
    has: "đã",
    second: "giây",
    continue: "Tiếp tục",
    save: "Lưu",
    skip: "Bỏ qua",
    searching: "Tìm kiếm...",
  },
  auth: {
    verify_telephone_number_again: "Vui lòng kiểm tra lại số điện thoại!",
    greetings_to_you: "Chào mừng bạn,",
    register: "ĐĂNG KÝ",
    login: "ĐĂNG NHẬP",
    continue: "Tiếp tục",
    by_proceeding: "Bằng việc tiếp tục, bạn sẽ đồng ý với ",
    terms_of_service: "Điều khoản dịch vụ và Chính sách bảo mật",
    of_sdoctor: "của SDoctor",
    sending_OTP_code_to: "Gửi mã xác minh OTP tới:",
    zalo: "Tin nhắn Zalo",
    sms: "SMS OTP",
    or_register_by: "Hoặc đăng ký bằng",
    exists_in_our_system: " tồn tại trong hệ thống của chúng tôi!",
    register_now: "Đăng ký ngay",
    log_in_now: "Đăng nhập ngay",
    enter_your_phone_number: "Nhập số điện thoại",
    name_confirmation: "Xác nhận họ tên",
    enter_full_name: "Nhập họ và tên",
  },
  otp: {
    otpVerificationTitle: "Xác thực OTP",
    enterOtpCode: "Vui lòng nhập mã xác thực được gửi tới số điện thoại",
    resendCode: "Gửi lại mã",
    incorrectCode: "Mã xác thực không chính xác, vui lòng nhập lại!",
    incorrect_login_code: "Sai mã đăng nhập",
    code_sent_successfully: "Gửi mã thành công!",
  },
  create_patient: {
    create_new_patient: "Tạo mới hồ sơ y tế",
    please_enter_information:
      "Vui lòng nhập chính xác thông tin của bệnh nhân (người khám) theo thông tin giấy tờ tùy thân (CCCD/CMND/BHYT). Thông tin không chính xác có thể làm gián đoạn quá trình khám, chữa bệnh của bạn.",
    note: "Lưu ý:",
    field_required: "là những trường thông tin bắt buộc",
    full_name: "Họ và tên",
    enter_fullname: "Nhập họ tên",
    please_enter_fullname: "Vui lòng nhập họ tên!",
    please_enter_phone: "Vui lòng nhập số điện thoại!",
    please_enter_date_birth: "Vui lòng chọn ngày sinh!",
    phone_number: "Số điện thoại",
    ennter_phone_number: "Nhập số điện thoại",
    date_of_birth: "Ngày sinh",
    gender: "Giới tính",
    male: "Nam",
    fe_male: "Nữ",
    enter_email: "Nhập địa chỉ email",
    province: "Tỉnh/ Thành phố",
    select_province: "Chọn Tỉnh/ Thành phố",
    please_select_province: "Vui lòng chọn Tỉnh/Thành phố!",
    district: "Quận/ Huyện",
    select_district: "Chọn Quận/ Huyện",
    please_select_district: "Vui lòng chọn Quận/Huyện!",
    ward: "Phường/ Xã",
    select_ward: "Chọn Phường/Xã",
    detail_address: "Địa chỉ chi tiết",
    example_address: "Ví dụ: Số nhà, đường, ...",
    create_patient_successful: "Tạo hồ sơ thành công!",
    create_patient_failure: "Tạo hồ sơ thất bại!",
  },
}

export default vi
export type Translations = typeof vi