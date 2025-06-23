import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar/>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        <p className="text-center text-gray-600">
          Have a question, feedback, or partnership inquiry? We're here to help.
        </p>

        <Card>
          <CardContent className="p-6 space-y-6">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your full name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4 text-sm text-gray-700">
            <h2 className="text-xl font-semibold">General Inquiries</h2>
            <p>
              Email: <strong>support@hiresetgo.in</strong>
            </p>
            <p>Response Time: Within 24–48 hours</p>

            <h2 className="text-xl font-semibold pt-4">Technical Help</h2>
            <p>Facing issues with your profile or applications?</p>
            <p>
              Email: <strong>tech@hiresetgo.in</strong>
            </p>

            <h2 className="text-xl font-semibold pt-4">
              Recruiters & Partnerships
            </h2>
            <p>
              Email: <strong>partners@hiresetgo.in</strong>
            </p>

            <h2 className="text-xl font-semibold pt-4">Office Address</h2>
            <p>
              HireSetGo Technologies Pvt. Ltd.
              <br />
              3rd Floor, TechHub Tower,
              <br />
              Hitech City, Hyderabad – 500081
              <br />
              Phone: +91 98765 43210
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-sm text-gray-700 space-y-2">
            <h2 className="text-xl font-semibold">
              Guidelines Before Contacting Us
            </h2>
            <ul className="list-disc list-inside">
              <li>Be clear and concise in your message.</li>
              <li>Mention your registered email or job ID.</li>
              <li>
                Include screenshots if you’re reporting a technical issue.
              </li>
              <li>Use a relevant subject line like “Job Application Error”.</li>
              <li>
                Respect our team’s time — we’ll do our best to help you quickly!
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Footer/>
    </>
  );
};

export default ContactPage;
