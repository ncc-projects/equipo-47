package com.example.petbackend.shared.util;

public class EmailUtil {

    public static String htmlMessageRenewPassword(String resetLink) {
        return "<html>" +
                "<body style=\"margin:0; padding:0; font-family:'Arial', sans-serif; background-color:#FFFFFF;\">" +

                "<table align=\"center\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" " +
                "style=\"max-width:600px; background:#FFFFFF; border-radius:8px; overflow:hidden; " +
                "box-shadow:0 2px 8px rgba(0,0,0,0.1);\">" +

                "<tr>" +
                "<td style=\"background:#4A4B4B; padding:20px; text-align:center; color:#FFFFFF;\">" +
                "<h1 style=\"margin:0; font-size:24px;\">Renovar tu Contraseña</h1>" +
                "</td>" +
                "</tr>" +

                "<tr>" +
                "<td style=\"padding:30px; color:#4A4B4B;\">" +
                "<p style=\"font-size:16px; margin-top:0;\">Hola,</p>" +

                "<p style=\"font-size:16px; line-height:1.6;\">" +
                "Recibimos una solicitud para renovar tu contraseña. " +
                "Para continuar, haz clic en el siguiente botón:" +
                "</p>" +

                "<div style=\"text-align:center; margin:30px 0;\">" +
                "<a href=\"" + resetLink + "\" " +
                "style=\"display:inline-block; background:#3E3E3E; color:#FFFFFF; " +
                "padding:14px 28px; font-size:16px; font-weight:bold; " +
                "text-decoration:none; border-radius:6px;\">" +
                "Renovar Contraseña" +
                "</a>" +
                "</div>" +

                "<p style=\"font-size:14px; color:#4A4B4B; line-height:1.5;\">" +
                "Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:" +
                "</p>" +

                "<p style=\"font-size:14px; color:#0D6EFD; word-break:break-all;\">" +
                resetLink +
                "</p>" +

                "<p style=\"font-size:14px; color:#4A4B4B; line-height:1.5;\">" +
                "Por motivos de seguridad, este enlace expirará en 30 minutos. " +
                "Si no solicitaste un cambio de contraseña, puedes ignorar este mensaje." +
                "</p>" +
                "</td>" +
                "</tr>" +

                "<tr>" +
                "<td style=\"background:#f8f9fa; padding:15px; text-align:center; " +
                "font-size:12px; color:#888888;\">" +
                "© 2025 Pet Health Tracker. Seguridad y soporte al usuario." +
                "</td>" +
                "</tr>" +

                "</table>" +
                "</body>" +
                "</html>";
    }
}