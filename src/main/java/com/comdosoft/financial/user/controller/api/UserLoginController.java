package com.comdosoft.financial.user.controller.api;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.comdosoft.financial.user.domain.Response;
import com.comdosoft.financial.user.domain.query.MailReq;
import com.comdosoft.financial.user.domain.zhangfu.Customer;
import com.comdosoft.financial.user.service.MailService;
import com.comdosoft.financial.user.service.UserLoginService;
import com.comdosoft.financial.user.utils.SysUtils;

/**
 * 
 * 用户登陆 <功能描述>
 *
 * @author xfh 2015年2月7日
 *
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserLoginController {

    @Resource
    private UserLoginService userLoginService;

    @Value("${passPath}")
    private String passPath;
    
    @Value("${sendEmailRegisterServicsePath}")
    private String sendEmailRegisterServicsePath;
    
    @Value("${sendEmailFindServicsePath}")
    private String sendEmailFindServicsePath;
    
    @Resource
    private MailService MailService;
    
    /**
     * 发送手机验证码(注册)
     * 
     * @param number
     */
    @RequestMapping(value = "sendPhoneVerificationCodeReg", method = RequestMethod.POST)
    public Response sendPhoneVerificationCodeReg(@RequestBody Map<String, Object> map) {
        try {
            Customer customer = new Customer();
            customer.setUsername((String)map.get("codeNumber") );
            String str = SysUtils.getCode();
            customer.setPassword("000000");
            customer.setCityId(0);
            customer.setDentcode(str);
            customer.setStatus(Customer.STATUS_NON_END);
            customer.setTypes(Customer.TYPE_CUSTOMER);
            customer.setAccountType(false);
            String phone = (String)map.get("codeNumber");//手机号
            if (userLoginService.findUnameAndStatus(customer) > 0) {
            	 userLoginService.updateCode(customer);
            	 Boolean is_sucess = SysUtils.sendPhoneCode("感谢您注册华尔街金融，您的验证码为："+str, phone);
                 if(!is_sucess){
                 	return Response.getError("获取验证码失败！");
                 }
                 return Response.getSuccess(str);
            } else{
            	if (userLoginService.findUname((String)map.get("codeNumber"),Customer.TYPE_CUSTOMER,Customer.STATUS_NORMAL) == 0) {
                    try {
                        Boolean is_sucess = SysUtils.sendPhoneCode("感谢您注册华尔街金融，您的验证码为："+str, phone);
                        if(!is_sucess){
                        	return Response.getError("获取验证码失败！");
                        }else{
                        	// 添加假状态
                            userLoginService.addUser(customer);
                            return Response.getSuccess(str);
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                        return Response.getError("系统异常！");
                    }
                    } else {
                            return Response.getError("该用户已注册！");
                    }
            }
        } catch (Exception e) {
        	e.printStackTrace();
            return Response.getError("系统异常！");
        }
    }

    
    /**
     * 注册用户
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "userRegistration", method = RequestMethod.POST)
    public Response userRegistration(@RequestBody Customer customer, HttpSession session) {
        try {
            customer.setTypes(Customer.TYPE_CUSTOMER);
            customer.setStatus(Customer.STATUS_NON_END);
            if (userLoginService.findUserAndStatus(customer) == 0) {
            	//getAccountType(0)手机(1)邮箱
                if (!customer.getAccountType()) {
                    if (customer.getCode().equals(userLoginService.findCode(customer))) {
                        customer.setPhone(customer.getUsername());
                        customer.setStatus(Customer.STATUS_NORMAL);
                        userLoginService.updateUser(customer);
                        return Response.getSuccess("注册成功!");
                    } else {
                        return Response.getError("验证码错误！");
                    }
                } else {
                    customer.setStatus(Customer.STATUS_NON_ACTIVE);
                    customer.setEmail(customer.getUsername());
                    userLoginService.addUser(customer);
                    MailReq req = new MailReq();
                    req.setUserName(customer.getUsername());
                    req.setAddress(customer.getUsername());
                    req.setUrl("<a href='"+sendEmailRegisterServicsePath+"?sendStatus=-1&sendusername="+customer.getUsername()+"'>点击激活！</a>");
                    MailService.sendMailWithFilesAsynchronous(req);
                    return Response.getSuccess("激活链接已发送至你的邮箱，请点击激活。");
                }
            } else {
                return Response.getError("用户已注册！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.getError("注册失败！系统异常");
        }
    }
    
    /**
     * 注册用户(web)
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "userWebRegistration", method = RequestMethod.POST)
    public Response userWebRegistration(@RequestBody Customer customer, HttpSession session) {
    	try {
    		customer.setTypes(Customer.TYPE_CUSTOMER);
    		customer.setStatus(Customer.STATUS_NON_END);
    		if (userLoginService.findUserAndStatus(customer) == 0) {
    			//getAccountType(0)手机(1)邮箱
    			//加密
    			customer.setPassword(SysUtils.string2MD5(customer.getPassword()));
    			if (!customer.getAccountType()) {
    				if (customer.getCode().equals(userLoginService.findCode(customer))) {
    					customer.setPhone(customer.getUsername());
    					customer.setStatus(Customer.STATUS_NORMAL);
    					userLoginService.updateUser(customer);
    					return Response.getSuccess("注册成功!");
    				} else {
    					return Response.getError("验证码错误！");
    				}
    			} else {
    				customer.setStatus(Customer.STATUS_NON_ACTIVE);
    				
    				MailReq req = new MailReq();
    				req.setUserName(customer.getUsername());
    				customer.setEmail(customer.getUsername());
    				userLoginService.addUser(customer);
    				req.setAddress(customer.getUsername());
    				req.setUrl("<a href='"+sendEmailRegisterServicsePath+"?sendStatus=-1&sendusername="+customer.getUsername()+"'>点击激活！</a>");
    				MailService.sendMailWithFilesAsynchronous(req);
    				return Response.getSuccess("激活链接已发送至你的邮箱，请点击激活。");
    			}
    		} else {
    			return Response.getError("用户已注册！");
    		}
    	} catch (Exception e) {
    		e.printStackTrace();
    		return Response.getError("注册失败！系统异常");
    	}
    }
    
    /**
     * 激活邮箱账号状态
     * 
     * @param id
     * @return
     */
    @RequestMapping(value = "activationEmail", method = RequestMethod.POST)
    public Response activationEmail(@RequestBody Customer customer) {
        try {
            customer.setStatus(Customer.STATUS_NORMAL);
            customer.setTypes(Customer.TYPE_CUSTOMER);
            userLoginService.activationEmail(customer);
                return Response.getSuccess("激活成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return Response.getError("系统异常！");
        }
    }
    
    /**
     * 用户登陆
     * 
     * @param id
     * @return
     */
    @RequestMapping(value = "studentLogin", method = RequestMethod.POST)
    public Response studentLogin(@RequestBody Customer customer) {
        try {
            customer.setTypes(Customer.TYPE_CUSTOMER);
            customer.setStatus(Customer.STATUS_NORMAL);
            Map<Object, Object> tomer = userLoginService.doLogin(customer);
            if (tomer != null) {
            	//修改登陆时间
                userLoginService.updateLastLoginedAt(customer);
                return Response.getSuccess(tomer);
            } else {
                return Response.getError("用户名/密码错误！账号不可用！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.getError("系统异常！");
        }
    }
    
    /**
     * 用户登陆(web)
     * 
     * @param id
     * @return
     */
    @RequestMapping(value = "studentWebLogin", method = RequestMethod.POST)
    public Response studentWebLogin(@RequestBody Customer customer) {
    	try {
    		customer.setTypes(Customer.TYPE_CUSTOMER);
    		customer.setStatus(Customer.STATUS_NORMAL);
    		customer.setPassword(SysUtils.string2MD5(customer.getPassword()));
    		Map<Object, Object> tomer = userLoginService.doLogin(customer);
    		if (tomer != null) {
    			//修改登陆时间
    			userLoginService.updateLastLoginedAt(customer);
    			return Response.getSuccess(tomer);
    		} else {
    			return Response.getError("用户名/密码错误！账号不可用！");
    		}
    	} catch (Exception e) {
    		e.printStackTrace();
    		return Response.getError("系统异常！");
    	}
    }
    
    /**
     * 发送手机验证码(找回密码)
     * 
     * @param number
     */
    @RequestMapping(value = "sendPhoneVerificationCodeFind", method = RequestMethod.POST)
    public Response sendPhoneVerificationCodeFind(@RequestBody Map<String, String> map) {
        try {
            Customer customer = new Customer();
            customer.setUsername(map.get("codeNumber"));
            String str = SysUtils.getCode();
            customer.setDentcode(str);
            if (userLoginService.findUname(map.get("codeNumber"),Customer.TYPE_CUSTOMER,Customer.STATUS_NORMAL) == 0) {
                return Response.getError("用户不存在！");
            } else {
                userLoginService.updateCode(customer);
                Boolean is_sucess = SysUtils.sendPhoneCode("感谢您注册华尔街金融，您的验证码为："+str, (String)map.get("codeNumber"));
                if(!is_sucess){
                	return Response.getError("获取验证码失败！");
                }else{
                	return Response.getSuccess(str);
                }
            }
        } catch (Exception e) {
            return Response.getError("获取验证码失败！");
        }
    }
    
    /**
     * 找回密码
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "updatePassword", method = RequestMethod.POST)
    public Response updatePassword(@RequestBody Customer customer) {
        try {
            if (userLoginService.findUname(customer.getUsername(),Customer.TYPE_CUSTOMER,Customer.STATUS_NORMAL) > 0) {
                if (customer.getCode().equals(userLoginService.findCode(customer))) {
                    userLoginService.updatePassword(customer);
                    return Response.getSuccess("找回密码成功！");
                } else {
                    return Response.getError("验证码错误！");
                }
            } else {
                return Response.getError("用户名错误！");
            }
        } catch (Exception e) {
        	e.printStackTrace();
            return Response.getError("请求失败！");
        }
    }
    
    /**
     * 发送邮箱验证(找回密码)
     * 
     * @param number
     */
    @RequestMapping(value = "sendEmailVerificationCode", method = RequestMethod.POST)
    public Response sendEmailVerificationCode(@RequestBody Map<String, String> map) {
    	 try{
    		 MailReq req = new MailReq();
    		 req.setUserName(map.get("codeNumber"));
    		 req.setAddress(map.get("codeNumber"));
    		 req.setUrl("<a href='"+sendEmailFindServicsePath+"?sendStatus=-1&sendusername="+map.get("codeNumber")+"'>找回密码！</a>");
    		 MailService.sendMailWithFilesAsynchronous(req);
    		 return Response.getSuccess("发送邮件成功！");
    	 }catch(Exception e){
    		 e.printStackTrace();
    		 return Response.getSuccess("发送邮件失败！");
    	 }
    }
    
    
    /**
     * (pc端，含有图片验证码校验)
     * 
     * @param id
     * @return
     */
    @RequestMapping(value = "sizeUpImgCode", method = RequestMethod.POST)
    public Response sizeUpImgCode(@RequestBody Map<String, String> map ,HttpSession session) {
        try {
        	if((String) session.getAttribute("imageCode") == null){
        		return Response.getError("图片验证码错误！");
        	}else{
        		if(((String) session.getAttribute("imageCode")).equalsIgnoreCase(map.get("imgnum"))){
               	 return Response.getSuccess("true");
               }else{
               	return Response.getError("图片验证码错误！");
               }
        	}
        } catch (Exception e) {
            e.printStackTrace();
            return Response.getError("系统异常！");
        }
    }

    /**
     * (找回密码web端第一步)
     * 
     * @param number
     */
    @RequestMapping(value = "getFindUser", method = RequestMethod.POST)
    public Response getFindUser(@RequestBody Map<String, Object> map,HttpSession session) {
        try {
            Customer customer = new Customer();
            customer.setUsername((String)map.get("username"));
            if (userLoginService.findUname((String)map.get("username"),Customer.TYPE_CUSTOMER,Customer.STATUS_NORMAL) == 0) {
                return Response.getError("用户不存在！");
            } else {
                return Response.getSuccess("用户存在！");
            }
        } catch (Exception e) {
            return Response.getError("系统异常！");
        }
    }
    

    /**
     * 找回密码(web)校验验证码
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "webFicationCode", method = RequestMethod.POST)
    public Response webFicationCode(@RequestBody Customer customer) {
        try {
                if (customer.getCode().equals(userLoginService.findCode(customer))) {
                    return Response.getSuccess("验证码正确！");
                } else {
                    return Response.getError("验证码错误！");
                }
        } catch (Exception e) {
            return Response.getError("请求失败！");
        }
    }
    
    /**
     * 找回密码(web)修改密码
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "webUpdatePass", method = RequestMethod.POST)
    public Response webUpdatePass(@RequestBody Customer customer) {
        try {
            if (userLoginService.findUname(customer.getUsername(),Customer.TYPE_CUSTOMER,Customer.STATUS_NORMAL) > 0) {
            	customer.setPassword(SysUtils.string2MD5(customer.getPassword()));
                    userLoginService.updatePassword(customer);
                    return Response.getSuccess("找回密码成功！");
            } else {
                return Response.getError("用户名错误！");
            }
        } catch (Exception e) {
        	e.printStackTrace();
            return Response.getError("请求失败！");
        }
    }
    
    /**
     * 获取验证码（登录用）
     * 
     * @param response
     */
    @RequestMapping("getRandCodeImg")
    public void getRandCodeImg(HttpServletResponse response,HttpSession session) {

        // 设置页面不缓存数据
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        // 获取4位随机验证码
        char[] randNum = SysUtils.getRandNum(4);
        String randNumStr = new String(randNum);

        // 将验证码存入session
        session.setAttribute("imageCode", randNumStr);

        // 生成验证码图片
        BufferedImage image = SysUtils.generateRandImg(randNum);

        try {// 输出图象到页面
            ImageIO.write(image, "JPEG", response.getOutputStream());
        } catch (IOException ioEx) {
           // logger.error("验证码图片显示异常", ioEx);
        }
    }
    
    
    /**
     * 检查该邮箱是否注册
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "jusEmail", method = RequestMethod.POST)
    public Response jusEmail(@RequestBody Customer customer) {
        try {
            if (userLoginService.findUname(customer.getUsername(),Customer.TYPE_CUSTOMER,Customer.STATUS_NORMAL) == 0) {
            	 return Response.getSuccess("该邮箱可以使用！");
            } else {
                return Response.getError("该邮箱已经注册！");
            }
        } catch (Exception e) {
            return Response.getError("请求失败！");
        }
    }
    
}
