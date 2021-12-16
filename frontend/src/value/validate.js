const unicodeRe = /^[a-zA-Z0-9\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/

module.exports = {
  ALPHANUMBERIC_VALIDATE: [
    {
      required: true,
      message: 'Vui lòng không để trống trường này.',
    },
    {
      pattern: unicodeRe,
      message: 'Chỉ bao gồm chữ cái, số và khoảng trắng.',
    },
    {
      pattern: /^.{1,80}$/,
      message: 'Không được quá 80 kí tự.',
    },
  ],
  ID_VALIDATE: [
    {
      required: true,
      message: 'Vui lòng không để trống trường này.',
    },
    {
      pattern: /^[A-Za-z0-9-]+$/,
      message: 'Chỉ bao gồm chữ cái, số và gạch ngang.',
    },
    {
      pattern: /^.{5,20}$/,
      message: 'Độ dài từ 5 đến 20 kí tự.',
    },
  ],
  NUMBER_VALIDATE: [
    {
      required: true,
      message: 'Vui lòng không để trống trường này.',
    },
    {
      pattern: /^[0-9]+$/,
      message: 'Chỉ được nhập chữ số.',
    },
    {
      pattern: /^.{1,20}$/,
      message: 'Không được quá 20 kí tự.',
    },
  ],
  MAIL_VALIDATE: [
    {
      required: true,
      message: 'Vui lòng không để trống trường này.',
    },
    {
      pattern: /^[A-Za-z0-9.@]+$/,
      message: 'Chỉ bao gồm chữ cái, số, dấu . và @.',
    },
    {
      pattern: /^.{1,50}$/,
      message: 'Không được quá 20 kí tự.',
    },
  ],
};