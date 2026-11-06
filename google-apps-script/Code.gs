const SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_SECRET";

function setupSheet() {
  const ss = SpreadsheetApp.create("Lin and Leo Orders");
  const sheet = ss.getActiveSheet();
  sheet.setName("Orders");
  sheet.appendRow([
    "Order ID", "Created At", "Customer Name", "Email", "Phone", "Shipping Address",
    "Quantity", "Book Subtotal (INR)", "Payment Method", "Payment Status", "Order Status",
    "Razorpay Order ID", "Razorpay Payment ID"
  ]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 13).setFontWeight("bold");
  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID", ss.getId());
  Logger.log("Your order sheet: " + ss.getUrl());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || "{}");
    if (data.secret !== SHARED_SECRET || SHARED_SECRET.indexOf("REPLACE_") === 0) {
      return json({ ok: false, error: "Unauthorized" });
    }
    lock.waitLock(10000);
    const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    if (!id) return json({ ok: false, error: "Run setupSheet first" });
    const sheet = SpreadsheetApp.openById(id).getSheetByName("Orders");
    if (data.action === "create") {
      sheet.appendRow([
        data.orderId, new Date(), data.name, data.email, data.phone, data.address,
        data.quantity, data.subtotal, data.paymentMethod, data.paymentStatus,
        "New", data.razorpayOrderId || "", ""
      ]);
      return json({ ok: true });
    }
    if (data.action === "paid") {
      const values = sheet.getDataRange().getValues();
      for (let i = values.length - 1; i >= 1; i--) {
        if (values[i][0] === data.orderId) {
          sheet.getRange(i + 1, 10).setValue("Paid");
          sheet.getRange(i + 1, 13).setValue(data.paymentId);
          return json({ ok: true });
        }
      }
      return json({ ok: false, error: "Order not found" });
    }
    return json({ ok: false, error: "Unknown action" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
