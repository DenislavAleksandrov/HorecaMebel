using HorecaMebel.Models.Basket;
using HorecaMebel.Resources;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace HorecaBL.Administration
{
    public interface IUtilities
    {
        string HashPassword(string password);
        string ConvertToBase64(object input);
        string DecodeFromBase64(object input);
        byte[] ByteArrayFromStream(Stream input, int contentLeght);
        string UploadFileWithNoResize(string hostUrl, string folder, string fileName, byte[] arr, out string path);
        SelectListItem DefaultOption { get; }

        string FormBodyEmailPart(string title, string firstName, string lastName,
                                 string address, string city, string postCode, string country, string company,
                                 string vat, string phone, string email, Basket basket, string freeText);
    }

    public class Utilities : IUtilities
    {
        public SelectListItem DefaultOption
        {
            get
            {
                return new SelectListItem() { Text = ".........", Selected = true, Value = "-1" };
            }
        }

        public string HashPassword(string password)
        {
            if (password == null)
            {
                return null;
            }

            HashAlgorithm hashAlg = new SHA256CryptoServiceProvider();
            
            byte[] bytValue = System.Text.Encoding.UTF8.GetBytes(password);
            
            byte[] bytHash = hashAlg.ComputeHash(bytValue);

            return Convert.ToBase64String(bytHash);
        }

        public string ConvertToBase64(object input)
        {
            byte[] toEncodeAsBytes = System.Text.Encoding.Unicode.GetBytes(Convert.ToString(input));

            return System.Convert.ToBase64String(toEncodeAsBytes);
        }

        public string DecodeFromBase64(object input)
        {
            byte[] encodedDataAsBytes = System.Convert.FromBase64String(Convert.ToString(input));

            return System.Text.Encoding.Unicode.GetString(encodedDataAsBytes); ;
        }

        public  byte[] ByteArrayFromStream(Stream input, int contentLeght)
        {
            byte[] buffer = new byte[contentLeght];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        public string UploadFileWithNoResize(string hostUrl, string folder, string fileName, byte[] arr, out string path)
        {
            fileName = Path.GetFileNameWithoutExtension(fileName) + "_" + DateTime.Now.ToString("HHmmssfff") + Path.GetExtension(fileName);

            path = folder + @"\" + fileName;


            string directory = AppDomain.CurrentDomain.BaseDirectory + "images\\" + folder;


            FileStream fileToupload = new FileStream(directory, FileMode.Create);
            fileToupload.Write(arr, 0, arr.Length);
            fileToupload.Close();
            fileToupload.Dispose();

            return hostUrl + @"/" + fileName;
        }

        public string FormBodyEmailPart(string title, string firstName, string lastName, 
                                      string address, string city, string postCode, string country, string company,
                                      string vat, string phone, string email, Basket basket, string freeText)
        {
            StringBuilder str = new StringBuilder();

            str.Append("<p>Sehr geehrte Damen und Herren,</p>");

            str.Append("<p>Herzlichen Dank für Ihre Bestellung bei horecamoebel.de.</p>");

            str.Append("<p>Wir haben Ihre Bestellung erhalten und werden diese umgehend bearbeiten:</p>");

            str.Append("<p>Diese Bestellbestätigung ist noch keine Annahme des Angebots auf Abschluss eines Kaufvertrages. Der Kaufvertrag kommt erst zustande, wenn wir eine gesonderte Auftragsbestätigung an Sie versenden oder Ihnen die Ware zustellen. Sollten wir Ihr Angebot nicht innerhalb von 14 Tagen angenommen haben, gilt es als abgelehnt. Über Produkte, die nicht in der Auftragsbestätigung aufgeführt sind, kommt kein Kaufvertrag zustande.</p>");

            str.Append("<br/>");

            str.Append("<p>Ihre Adresse:</p>");

            str.Append("<p>" + title + " " + firstName + " " + lastName + "</p>");
            str.Append("<p>"+Resources.Address+": " + address + "</p>");
            str.Append("<p>"+Resources.PostCode+": " + postCode + " </p>");
            str.Append("<p>"+Resources.City+": " + city + " </p>");
           
            str.Append("<p>"+Resources.Country+": " + country + "</p>");
            
            if (!String.IsNullOrEmpty(company))
            {
                str.Append("<p>"+Resources.CompanyName+": " + company + "</p>");
            }

            str.Append("<p>"+Resources.VATNumber+": " + vat + "</p>");
            str.Append("<p>"+Resources.EMail+": " + email + "</p>");
            str.Append("<p>"+Resources.Phone+": " + phone + "</p>");

            if (!String.IsNullOrEmpty(freeText))
            {
                str.Append("<p>"+Resources.FreeText+": " + freeText + "</p>");
            }

            str.Append("<br/>");

            str.Append("<h2>ÜBERSICHT ÜBER IHRE BESTELLUNG:</h2>");

            str.Append("<table>");
            
            str.Append("<thead><tr><th></th><th>"+Resources.Name+"</th><th>"+Resources.SinglePrice+"</th><th>"+Resources.Count+"</th><th>"+Resources.Sum+"</th></tr></thead>");

            str.Append("<tbody>");

            str.Append("</tbody>");
               
            if (basket.ArmchairsInBasket != null && basket.ArmchairsInBasket.Count > 0)
            {
                foreach (var armchair in basket.ArmchairsInBasket)
                {
                    str.Append("<tr>");
                    str.Append("<td>");
                    str.Append("<img src='" + armchair.Armchair.ImagePath + "' style='width:150px !important; height:150px !important;' class='element-in-basket-img'/>");
                    str.Append("</td>");

                    str.Append("<td style='width:150px'>");
                    str.Append("<ul>");
                    str.Append("<li style='margin-bottom:10px'>" + armchair.Armchair.Name + "</li>");
                    str.Append(" <li style='margin-bottom:10px'>" + Resources.SkinOptions + ":" + armchair.Skin + "</li>");

                    str.Append("</ul>");
                    str.Append("</td>");

                    double price = armchair.Armchair.NewPrice.HasValue ? armchair.Armchair.NewPrice.Value : armchair.Armchair.Price;

                    str.Append("<td style='width:150px; text-align:center'> " + price + " €");
                    str.Append("</td>");

                    str.Append("<td style='width:150px; text-align:center'> " + armchair.Count + "");
                    str.Append("</td>");

                    str.Append("<td style='width:150p; text-align:center'> " + armchair.SinglePrice + " €");
                    str.Append("</td>");
                    str.Append("</tr>");
                }
            }

            if (basket.SofasInBasket != null && basket.SofasInBasket.Count > 0)
            {
                foreach (var sofa in basket.SofasInBasket)
                {
                    str.Append("<tr>");
                    str.Append("<td>");
                    str.Append("<img src='" + sofa.Sofa.ImagePath + "' style='width:150px !important; height:150px !important;' class='element-in-basket-img'/>");
                    str.Append("</td>");

                    str.Append("<td style='width:150px'>");
                    str.Append("<ul>");
                    str.Append("<li style='margin-bottom:10px'>" + sofa.Sofa.Name + "</li>");
                    str.Append(" <li style='margin-bottom:10px'>" + Resources.SkinOptions + ":" + sofa.Skin + "</li>");

                    str.Append("</ul>");
                    str.Append("</td>");

                    double price = sofa.Sofa.NewPrice.HasValue ? sofa.Sofa.NewPrice.Value : sofa.Sofa.Price.Value;

                    str.Append("<td style='width:150px; text-align:center'> " + price + " €");
                    str.Append("</td>");

                    str.Append("<td style='width:150px; text-align:center'> " + sofa.Count + "");
                    str.Append("</td>");

                    str.Append("<td style='width:150px; text-align:center'> " + sofa.SinglePrice + " €");
                    str.Append("</td>");
                    str.Append("</tr>");
                }
            }

            if (basket.CubeSeatsInBasket != null && basket.CubeSeatsInBasket.Count > 0)
            {
                foreach (var cubeSeat in basket.CubeSeatsInBasket)
                {
                    str.Append("<tr>");
                    str.Append("<td>");
                    str.Append("<img src='" + cubeSeat.CubeSeat.ImagePath + "' style='width:150px !important; height:150px !important;' class='element-in-basket-img'/>");
                    str.Append("</td>");

                    str.Append("<td style='width:150px'>");
                    str.Append("<ul>");
                        str.Append("<li style='margin-bottom:10px'>" + cubeSeat.CubeSeat.Name + "</li>");
                        str.Append(" <li style='margin-bottom:10px'>" + Resources.SkinOptions + ":" + cubeSeat.Skin + "</li>");

                        str.Append("</ul>");
                    str.Append("</td>");

                    double price = cubeSeat.CubeSeat.NewPrice.HasValue ? cubeSeat.CubeSeat.NewPrice.Value : cubeSeat.CubeSeat.Price.Value;

                    str.Append("<td style='width:150px ; text-align:center'> " + price + " €");
                    str.Append("</td>");

                    str.Append("<td style='width:150px ; text-align:center'> " + cubeSeat.Count + "");
                    str.Append("</td>");

                    str.Append("<td style='width:150px; text-align:center'> " + cubeSeat.SinglePrice + " €");
                    str.Append("</td>");
                    str.Append("</tr>");
                }
            }

            if (basket.ChairsInBasket != null && basket.ChairsInBasket.Count > 0)
            {
                foreach (var chair in basket.ChairsInBasket)
	            {
                    str.Append("<tr>");
		                str.Append("<td>");
                            str.Append("<img src='" + chair.Chair.ImagePath + "' style='width:150px !important; height:150px !important;' class='element-in-basket-img'/>");
                        str.Append("</td>");

                        str.Append("<td style='width:150px'>");
                            str.Append("<ul>");
                            str.Append("<li style='margin-bottom:10px'>"+chair.Chair.Name+"</li>");

                            if (!String.IsNullOrEmpty(chair.Colour))
                            {
                                str.Append(" <li style='margin-bottom:10px'>" + Resources.SkinOptions + ":" + chair.Colour + "</li>");
                            }

                            if (!String.IsNullOrEmpty(chair.WoodColour))
                            {
                                str.Append(" <li style='margin-bottom:10px'>" + Resources.WoodColor + ":" + chair.WoodColour + "</li>");
                            }
                            str.Append("</ul>");  
                        str.Append("</td>");     
                    
                        double price = chair.Chair.NewPrice.HasValue ? chair.Chair.NewPrice.Value : chair.Chair.Price;

                        str.Append("<td style='width:150px; text-align:center'> " + price + " €");
                        str.Append("</td>");

                        str.Append("<td style='width:150px; text-align:center'> " + chair.Count + "");
                        str.Append("</td>");

                        str.Append("<td style='width:150px; text-align:center'> " + chair.SinglePrice + " €");
                        str.Append("</td>");
                    str.Append("</tr>");
	            }               
            }

            str.Append("</table>");

            str.Append("<br/>");

            str.Append("<p><b>Zwischensumme: " + basket.BasketPriceOnlyFirnutures + " €</b></p>");

            str.Append("<p><b>Lieferkosten: " + basket.BasketPriceOnlyTransport + " €</b></p>");

            str.Append("<p><b>MwSt: " + basket.BasketPriceDDS + " €</b></p>");

            str.Append("<p><b>Gesamtbetrag : " + basket.BasketPriceFullPrice + " €</b></p>"); 

            str.Append("<p>Ihre Bestellung unterliegt den <a >Allgemeinen Liefer- und Zahlungsbedingungen</a> von horecamoebel.de.</p>"); 

            str.Append("<p>WICHTIG: Sollten Sie bis zum Ende des nächsten Werktages KEINE gesonderte Proformarechnung bzw.</p>");

            str.Append("<p>Auftragsbestätigung erhalten haben, setzen Sie sich bitte mit unserem Vertrieb per E-Mail in Verbindung.</p>");

            str.Append("<br/>");

            str.Append("<p><b>Vielen Dank für  Ihren Einkauf</b></p>");
            str.Append("<p><b>Ihr horecamoebel.de Team</b></p>");
            str.Append("<p><b>Horecamoebel.de wird betrieben von:</b></p>");
            str.Append("<p><b>Monti Möbel UG(haftungsbeschränkt)</b></p>");
            str.Append("<p><b>Sitz: D-53113 Bonn, Kaiserstr. 39</b></p>");

            str.Append("<p><b>Steuernummer: 205/5735/1876</b></p>");
            str.Append("<p><b>UST-ID: DE301282101</b></p>");
            str.Append("<p><b>Amtsgericht Bonn: HRB 21660</b></p>");

            str.Append("<p><b>Handelsregisternummer: HRB 201279</b></p>");
            str.Append("<p><b>zuständiges Amtsgericht: D-53113 Bonn</b></p>");

            return str.ToString() ;
        }     
    }
}
