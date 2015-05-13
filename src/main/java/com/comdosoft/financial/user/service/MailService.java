package com.comdosoft.financial.user.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.comdosoft.financial.user.domain.query.MailReq;
import com.sun.mail.util.MailSSLSocketFactory;

/**
 * 邮件发送
 * 
 * @author zengguang
 * 
 */
@Service
public class MailService {

    /**
     * 日志记录器
     */
    private static final Log logger = LogFactory.getLog(MailService.class);

    // 邮件服务器
    // @Value("${mailServerHost}")
    private String mailServerHost = "smtp.exmail.qq.com";

    // 邮件服务器端口
    // @Value("${mailServerPort}")
    private String mailServerPort = "465";

    // 邮件发送端帐号
    // @Value("${mailUserName}")
    private String mailUserName = "ebank007@epalmpay.cn";

    // 邮件发送端密码
    // @Value("${mailPassword}")
    private String mailPassword = "007ebank";

    /**
     * 发送邮件 (异步)<br>
     * <带附件>
     * 
     * @param email
     * @param subject
     * @param content
     * @param files
     */
    public void sendMailWithFilesAsynchronous(final MailReq req) {
        new Thread(new Runnable() {
            public void run() {
                sendMailWithFiles(req);
            }
        }).start();
    }

    /**
     * 发送邮件 <br>
     * <带附件>
     * 
     * @param toAddress
     * @param subject
     * @param content
     * @param files
     */
    public void sendMailWithFiles(MailReq req) {
        try {

            // 创建邮件Session所需的Properties对象
            Properties properties = new Properties();
            properties.put("mail.smtp.host", mailServerHost);
            properties.put("mail.smtp.port", mailServerPort);
            properties.put("mail.smtp.auth", true);

            // 设置SSL
            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            properties.put("mail.smtp.ssl.enable", "true");
            properties.put("mail.smtp.ssl.socketFactory", sf);

            // 创建邮件Session对象
            Session session = Session.getInstance(properties, new Authenticator() {
                public PasswordAuthentication getPasswordAuthentication() {// 以匿名内部类的形式创建登录服务器的认证对象
                    return new PasswordAuthentication(mailUserName, mailPassword);
                }
            });

            // 创建一个邮件消息
            Message message = new MimeMessage(session);

            // 发送者地址
            message.setFrom(new InternetAddress(mailUserName));

            // 接收者地址
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(req.getAddress()));

            // 主题
            message.setSubject(MimeUtility.encodeText("邮箱验证", MimeUtility.mimeCharset("utf-8"), null));

            // 构造Multipart
            Multipart multipart = new MimeMultipart();

            // 加入文本内容
            MimeBodyPart bodyText = new MimeBodyPart();
            bodyText.setText(getEmailContent(req), "utf-8", "html");// HTML
            multipart.addBodyPart(bodyText);

            // 加入附件内容
            // MimeBodyPart bodyFile = null;
            // if (!CollectionUtils.isEmpty(files)) {
            // for (File file : files) {
            // bodyFile = new MimeBodyPart();
            // FileDataSource fileDataSource = new FileDataSource(file);
            // bodyFile.setDataHandler(new DataHandler(fileDataSource));
            // bodyFile.setDisposition(Part.ATTACHMENT);
            // bodyFile.setFileName(MimeUtility.encodeText(fileDataSource.getName())); // 设置附件名
            // multipart.addBodyPart(bodyFile);
            // }
            // }

            message.setContent(multipart);// 发送内容
            message.setSentDate(new Date()); // 发送时间

            Transport.send(message);

            logger.debug("from[" + mailUserName + "]to[" + req.getAddress() + "]send[" + "" + "]content[" + req.getUrl() + "]成功");
        } catch (Exception e) {
            logger.debug("from[" + mailUserName + "]to[" + req.getAddress() + "]send[" + "" + "]content[" + req.getUrl() + "]失败", e);
        }
    }
    
    //修改邮箱发送邮件
    public void sendMail(MailReq req) {
        try {
            
            // 创建邮件Session所需的Properties对象
            Properties properties = new Properties();
            properties.put("mail.smtp.host", mailServerHost);
            properties.put("mail.smtp.port", mailServerPort);
            properties.put("mail.smtp.auth", true);
            
            // 设置SSL
            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            properties.put("mail.smtp.ssl.enable", "true");
            properties.put("mail.smtp.ssl.socketFactory", sf);
            
            // 创建邮件Session对象
            Session session = Session.getInstance(properties, new Authenticator() {
                public PasswordAuthentication getPasswordAuthentication() {// 以匿名内部类的形式创建登录服务器的认证对象
                    return new PasswordAuthentication(mailUserName, mailPassword);
                }
            });
            
            // 创建一个邮件消息
            Message message = new MimeMessage(session);
            
            // 发送者地址
            message.setFrom(new InternetAddress(mailUserName));
            
            // 接收者地址
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(req.getAddress()));
            
            // 主题
            message.setSubject(MimeUtility.encodeText("【华尔街金融】修改邮箱", MimeUtility.mimeCharset("utf-8"), null));
            
            // 构造Multipart
            Multipart multipart = new MimeMultipart();
            
            // 加入文本内容
            MimeBodyPart bodyText = new MimeBodyPart();
            bodyText.setText(updateEmailContent(req), "utf-8", "html");// HTML
            multipart.addBodyPart(bodyText);
            
            // 加入附件内容
            // MimeBodyPart bodyFile = null;
            // if (!CollectionUtils.isEmpty(files)) {
            // for (File file : files) {
            // bodyFile = new MimeBodyPart();
            // FileDataSource fileDataSource = new FileDataSource(file);
            // bodyFile.setDataHandler(new DataHandler(fileDataSource));
            // bodyFile.setDisposition(Part.ATTACHMENT);
            // bodyFile.setFileName(MimeUtility.encodeText(fileDataSource.getName())); // 设置附件名
            // multipart.addBodyPart(bodyFile);
            // }
            // }
            
            message.setContent(multipart);// 发送内容
            message.setSentDate(new Date()); // 发送时间
            
            Transport.send(message);
            
            logger.debug("from[" + mailUserName + "]to[" + req.getAddress() + "]send[" + "" + "]content[" + req.getUrl() + "]成功");
        } catch (Exception e) {
            logger.debug("from[" + mailUserName + "]to[" + req.getAddress() + "]send[" + "" + "]content[" + req.getUrl() + "]失败", e);
        }
    }

    /**
     * 测试主方法
     * 
     * @param args
     */
    public static void main(String[] args) {
        MailReq req = new MailReq();
        //req.setAddress("445875775@qq.com");
        req.setAddress("531950712@qq.com");
        req.setUrl("<a href='localhost:8080/ZFMerchant/#/findpassEmail'>激活账号</a>");
        req.setUserName("jjj");
        new MailService().sendMailWithFiles(req);
    }

    /**
     * 拼接email内容
     * 
     * @param studentEmail
     * @param activationCode
     * @return
     */
    private static String getEmailContent(MailReq req) {
        StringBuffer sb = new StringBuffer();
   /*     sb.append("尊敬的"+req.getUserName()+"先生/女士：<br>");
        sb.append("感谢您注册 ebank007.com! <br>");
        sb.append("请点击以下链接激活你的账户并设置您的账号密码：<br>");
        sb.append("The download link for Android is: this link<br>");
        sb.append(req.getUrl() + "<br>");
        sb.append("此邮件为系统自动发出，请勿回复此邮件，如果您有疑问，请联系我们：<br>");
        sb.append("邮箱：support@ebank007.com<br>");
        sb.append("服务热线：400-009-0876<br>");*/
        
        Map<Object, Object> map = new HashMap<Object, Object>();
        map=stytemtime();
        sb.append("亲爱的用户：<br>");
        sb.append("您好！<br>");
        sb.append("您于"+map.get("timeb")+" 注册华尔街金融账号：123456789@qq.com，点击以下链接，即可激活该账号：<br>");
        sb.append(req.getUrl() + "<br>");
        sb.append("（如果您无法点击此链接，请将它复制到浏览器地址栏后访问）<br>");
        sb.append("1.为了保障您账号的安全性，请在24小时内完成激活，此链接将在您激活过后一次失效！<br>");
        sb.append("2.请尽快完成激活，否则过期，即"+map.get("timec")+"后华尔街金融有权收回该账号。<br>");
        sb.append("<br><br>");
        sb.append("华尔街金融<br>");
        sb.append(map.get("timea")+"<br>");
        sb.append("<hr><br>");
        sb.append("若您没有注册过华尔街金融账号，请忽略此邮件，此账号将不会被激活，由此给您带来的不便请谅解！<br>");
        return sb.toString();
    }
    
    private static String updateEmailContent(MailReq req) {
        StringBuffer sb = new StringBuffer();
        sb.append("Hi,"+req.getUserName() + "<br>");
        sb.append("您正在进行修改邮箱的操作，请点击一下链接完成修改邮箱：<br>");
        sb.append(req.getUrl() + "<br>");
        sb.append("请勿回复此邮件，如果有疑问，请联系我们：<br>");
        sb.append("support@ebank007.com<b>");
        return sb.toString();
    }
    
    //手机接口用
    public static String changeEmailContent(MailReq req,String code) {
    	StringBuffer sb = new StringBuffer();
    	sb.append("Hi,"+req.getUserName() + "<br>");
    	sb.append("您正在进行修改邮箱的操作，验证码为：<br>");
    	sb.append( code + "<br>");
    	sb.append("请勿回复此邮件，如果有疑问，请联系我们：<br>");
    	sb.append("support@ebank007.com<b>");
    	return sb.toString();
    }
    
    
    //修改邮箱发送邮件  shouji
    public void sendMail_phone(MailReq req,String code,String msg) {
        try {
            
            // 创建邮件Session所需的Properties对象
            Properties properties = new Properties();
            properties.put("mail.smtp.host", mailServerHost);
            properties.put("mail.smtp.port", mailServerPort);
            properties.put("mail.smtp.auth", true);
            
            // 设置SSL
            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            properties.put("mail.smtp.ssl.enable", "true");
            properties.put("mail.smtp.ssl.socketFactory", sf);
            
            // 创建邮件Session对象
            Session session = Session.getInstance(properties, new Authenticator() {
                public PasswordAuthentication getPasswordAuthentication() {// 以匿名内部类的形式创建登录服务器的认证对象
                    return new PasswordAuthentication(mailUserName, mailPassword);
                }
            });
            
            // 创建一个邮件消息
            Message message = new MimeMessage(session);
            
            // 发送者地址
            message.setFrom(new InternetAddress(mailUserName));
            
            // 接收者地址
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(req.getAddress()));
            
            // 主题
            message.setSubject(MimeUtility.encodeText("【华尔街金融】"+msg, MimeUtility.mimeCharset("utf-8"), null));
            
            // 构造Multipart
            Multipart multipart = new MimeMultipart();
            
            // 加入文本内容
            MimeBodyPart bodyText = new MimeBodyPart();
            bodyText.setText(changeEmailContent(req,code), "utf-8", "html");// HTML
            multipart.addBodyPart(bodyText);
            
            // 加入附件内容
            // MimeBodyPart bodyFile = null;
            // if (!CollectionUtils.isEmpty(files)) {
            // for (File file : files) {
            // bodyFile = new MimeBodyPart();
            // FileDataSource fileDataSource = new FileDataSource(file);
            // bodyFile.setDataHandler(new DataHandler(fileDataSource));
            // bodyFile.setDisposition(Part.ATTACHMENT);
            // bodyFile.setFileName(MimeUtility.encodeText(fileDataSource.getName())); // 设置附件名
            // multipart.addBodyPart(bodyFile);
            // }
            // }
            
            message.setContent(multipart);// 发送内容
            message.setSentDate(new Date()); // 发送时间
            
            Transport.send(message);
            
            logger.debug("from[" + mailUserName + "]to[" + req.getAddress() + "]send[" + "" + "]content[" + req.getUrl() + "]成功");
        } catch (Exception e) {
            logger.debug("from[" + mailUserName + "]to[" + req.getAddress() + "]send[" + "" + "]content[" + req.getUrl() + "]失败", e);
        }
    }
    
    /**
     * 获取当前时间
     */
    public static Map<Object, Object> stytemtime(){
    	Calendar c = Calendar.getInstance();
    	Map<Object, Object> map = new HashMap<Object, Object>();
    	
    	 DateFormat format1=new SimpleDateFormat("yyyy年MM月dd日");
    	 DateFormat format2=new SimpleDateFormat("yyyy年MM月dd日 HH:mm");
    	 String time1=format1.format(c.getTime());
    	 String time2=format2.format(c.getTime());
    	 c.add(Calendar.DAY_OF_MONTH, 1);
    	 String time3=format2.format(c.getTime());
    	 map.put("timea", time1);
    	 map.put("timeb", time2);
    	 map.put("timec", time3);
    	 return map;
    }
}