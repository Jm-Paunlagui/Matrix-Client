import React from "react";

import Terms from "../../assets/img/terms.svg";
import BackNavigation from "../../components/navbars/BackNavigation";
import { ACCENT_BUTTON } from "../../assets/styles/styled-components";

/**
 * @description Terms and conditions listbox for the application
 */
export default function TermsAndConditions() {
  return (
    <>
      <BackNavigation
        backTo={"/"}
        contrast
        hasText
        isSmall={false}
        pageTitle={"Terms and Conditions"}
      />
      <div className="flex flex-col items-center max-w-screen-xl min-h-screen px-6 py-8 mx-auto mt-16 lg:grid lg:gap-8 xl:gap-0 lg:grid-cols-12 font-Montserrat">
        <div className=" place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-500 md:text-5xl xl:text-6xl">
            Terms and Conditions
          </h1>
          <p className="max-w-2xl mb-4 text-justify text-blue-500 lg:mb-8 md:text-lg lg:text-xl">
            This is the terms and conditions of the Sentiment Analysis
            Evaluation Result project. By using this website, you agree to the
            terms and conditions. If you do not agree to the terms and
            conditions, please do not use this website.
          </p>
          <p
            className={`flex items-center justify-center w-3/4 px-5 py-3 font-medium ${ACCENT_BUTTON}`}
          >
            Effective date: 2022-07-08
          </p>
        </div>
        <div className="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
          <img alt="mockup" src={Terms} />
        </div>
      </div>
      <div className="p-8">
        <div className="py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 font-Montserrat bg-blue-200 rounded-lg">
          <div className="text-gray-500">
            <span className="inline">1.</span>{" "}
            <span className="inline font-medium">Introduction</span>
            <p className="mt-4">
              Welcome to <b>Morning Group</b> (“Company”, “we”, “our”, “us”)!
            </p>
            <p className="mt-4">
              These Terms of Service (“Terms”, “Terms of Service”) govern your
              use of our website located at <b>Sentry.ai</b> (together or
              individually “Service”) operated by <b>Morning Group</b>.
            </p>
            <p className="mt-4">
              Our Privacy Policy also governs your use of our Service and
              explains how we collect, safeguard and disclose information that
              results from your use of our web pages.
            </p>
            <p className="mt-4">
              Your agreement with us includes these Terms and our Privacy Policy
              (“Agreements”). You acknowledge that you have read and understood
              Agreements, and agree to be bound of them.
            </p>
            <p className="mt-4">
              If you do not agree with (or cannot comply with) Agreements, then
              you may not use the Service, but please let us know by emailing at{" "}
              <b>paunlagui.cs.jm@gmail.com</b> so we can try to find a solution.
              These Terms apply to all visitors, users and others who wish to
              access or use Service.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">2.</span>{" "}
            <span className="inline font-medium">Content</span>
            <p className="mt-4">
              Content found on or through this Service are the property of
              Morning Group or used with permission. You may not distribute,
              modify, transmit, reuse, download, repost, copy, or use said
              Content, whether in whole or in part, for commercial purposes or
              for personal gain, without express advance written permission from
              us.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">3.</span>{" "}
            <span className="inline font-medium">Prohibited Uses</span>
            <p className="mt-4">
              You may use Service only for lawful purposes and in accordance
              with Terms. You agree not to use Service:
            </p>
            <p className="mt-4">
              0.1. In any way that violates any applicable national or
              international law or regulation.
            </p>
            <p className="mt-4">
              0.2. For the purpose of exploiting, harming, or attempting to
              exploit or harm minors in any way by exposing them to
              inappropriate content or otherwise.
            </p>
            <p className="mt-4">
              0.3. To transmit, or procure the sending of, any advertising or
              promotional material, including any “junk mail”, “chain letter,”
              “spam,” or any other similar solicitation.
            </p>
            <p className="mt-4">
              0.4. To impersonate or attempt to impersonate Company, a Company
              employee, another user, or any other person or entity.
            </p>
            <p className="mt-4">
              0.5. In any way that infringes upon the rights of others, or in
              any way is illegal, threatening, fraudulent, or harmful, or in
              connection with any unlawful, illegal, fraudulent, or harmful
              purpose or activity.
            </p>
            <p className="mt-4">
              0.6. To engage in any other conduct that restricts or inhibits
              anyone’s use or enjoyment of Service, or which, as determined by
              us, may harm or offend Company or users of Service or expose them
              to liability.
            </p>
            <p className="mt-4">Additionally, you agree not to:</p>
            <p className="mt-4">
              0.1. Use Service in any manner that could disable, overburden,
              damage, or impair Service or interfere with any other party’s use
              of Service, including their ability to engage in real time
              activities through Service.
            </p>
            <p className="mt-4">
              0.2. Use any robot, spider, or other automatic device, process, or
              means to access Service for any purpose, including monitoring or
              copying any of the material on Service.
            </p>
            <p className="mt-4">
              0.3. Use any manual process to monitor or copy any of the material
              on Service or for any other unauthorized purpose without our prior
              written consent.
            </p>
            <p className="mt-4">
              0.4. Use any device, software, or routine that interferes with the
              proper working of Service.
            </p>
            <p className="mt-4">
              0.5. Introduce any viruses, trojan horses, worms, logic bombs, or
              other material which is malicious or technologically harmful.
            </p>
            <p className="mt-4">
              0.6. Attempt to gain unauthorized access to, interfere with,
              damage, or disrupt any parts of Service, the server on which
              Service is stored, or any server, computer, or database connected
              to Service.
            </p>
            <p className="mt-4">
              0.7. Attack Service via a denial-of-service attack or a
              distributed denial-of-service attack.
            </p>
            <p className="mt-4">
              0.8. Take any action that may damage or falsify Company rating.
            </p>
            <p className="mt-4">
              0.9. Otherwise attempt to interfere with the proper working of
              Service.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">4.</span>{" "}
            <span className="inline font-medium">No Use By Minors</span>
            <p className="mt-4">
              Service is intended only for access and use by individuals at
              least eighteen (18) years old. By accessing or using Service, you
              warrant and represent that you are at least eighteen (18) years of
              age and with the full authority, right, and capacity to enter into
              this agreement and abide by all of the terms and conditions of
              Terms. If you are not at least eighteen (18) years old, you are
              prohibited from both the access and usage of Service.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">5.</span>{" "}
            <span className="inline font-medium">Intellectual Property</span>
            <p className="mt-4">
              Service and its original content (excluding Content provided by
              users), features and functionality are and will remain the
              exclusive property of Morning Group and its licensors. Service is
              protected by copyright, trademark, and other laws of and foreign
              countries. Our trademarks may not be used in connection with any
              product or service without the prior written consent of Morning
              Group.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">6.</span>{" "}
            <span className="inline font-medium">Copyright Policy</span>
            <p className="mt-4">
              We respect the intellectual property rights of others. It is our
              policy to respond to any claim that Content posted on Service
              infringes on the copyright or other intellectual property rights
              (“Infringement”) of any person or entity.
            </p>
            <p className="mt-4">
              If you are a copyright owner, or authorized on behalf of one, and
              you believe that the copyrighted work has been copied in a way
              that constitutes copyright infringement, please submit your claim
              via email to paunlagui.cs.jm@gmail.com, with the subject line:
              “Copyright Infringement” and include in your claim a detailed
              description of the alleged Infringement as detailed below, under
              “DMCA Notice and Procedure for Copyright Infringement Claims”
            </p>
            <p className="mt-4">
              You may be held accountable for damages (including costs and
              attorneys’ fees) for misrepresentation or bad-faith claims on the
              infringement of any Content found on and/or through Service on
              your copyright.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">7.</span>{" "}
            <span className="inline font-medium">
              DMCA Notice and Procedure for Copyright Infringement Claims
            </span>
            <p>
              You may submit a notification pursuant to the Digital Millennium
              Copyright Act (DMCA) by providing our Copyright Agent with the
              following information in writing (see 17 U.S.C 512(c)(3) for
              further detail):
            </p>
            <p className="mt-4">
              0.1. an electronic or physical signature of the person authorized
              to act on behalf of the owner of the copyright’s interest;
            </p>
            <p className="mt-4">
              0.2. a description of the copyrighted work that you claim has been
              infringed, including the URL (i.e., web page address) of the
              location where the copyrighted work exists or a copy of the
              copyrighted work;
            </p>
            <p className="mt-4">
              0.3. identification of the URL or other specific location on
              Service where the material that you claim is infringing is
              located;
            </p>
            <p className="mt-4">
              0.4. your address, telephone number, and email address;
            </p>
            <p className="mt-4">
              0.5. a statement by you that you have a good faith belief that the
              disputed use is not authorized by the copyright owner, its agent,
              or the law;
            </p>
            <p className="mt-4">
              0.6. a statement by you, made under penalty of perjury, that the
              above information in your notice is accurate and that you are the
              copyright owner or authorized to act on the copyright owner’s
              behalf.
            </p>
            <p className="mt-4">
              You can contact our Copyright Agent via email at
              paunlagui.cs.jm@gmail.com.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">8.</span>{" "}
            <span className="inline font-medium">
              Error Reporting and Feedback
            </span>
            <p className="mt-4">
              You may provide us either directly at paunlagui.cs.jm@gmail.com or
              via third party sites and tools with information and feedback
              concerning errors, suggestions for improvements, ideas, problems,
              complaints, and other matters related to our Service (“Feedback”).
              You acknowledge and agree that: (i) you shall not retain, acquire
              or assert any intellectual property right or other right, title or
              interest in or to the Feedback; (ii) Company may have development
              ideas similar to the Feedback; (iii) Feedback does not contain
              confidential information or proprietary information from you or
              any third party; and (iv) Company is not under any obligation of
              confidentiality with respect to the Feedback. In the event the
              transfer of the ownership to the Feedback is not possible due to
              applicable mandatory laws, you grant Company and its affiliates an
              exclusive, transferable, irrevocable, free-of-charge,
              sub-licensable, unlimited and perpetual right to use (including
              copy, modify, create derivative works, publish, distribute and
              commercialize) Feedback in any manner and for any purpose.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">9.</span>{" "}
            <span className="inline font-medium">Disclaimer Of Warranty</span>
            <p className="mt-4">
              THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS
              AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES
              OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR
              SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED
              THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES,
              THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT
              YOUR SOLE RISK.
            </p>
            <p className="mt-4">
              NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY
              WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
              SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
              SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR
              ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE
              SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH
              THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR
              UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES
              OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
              HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS
              OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR
              EXPECTATIONS.
            </p>
            <p className="mt-4">
              COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT
              LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT,
              AND FITNESS FOR PARTICULAR PURPOSE.
            </p>
            <p className="mt-4">
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">10.</span>{" "}
            <span className="inline font-medium">Limitation Of Liability</span>
            <p className="mt-4">
              EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS,
              DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT,
              PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT
              ARISES (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND
              EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL,
              IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED),
              WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS
              ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT,
              INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR
              PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY
              YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
              REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE
              IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO
              THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO
              CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES.
              SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE,
              INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR
              EXCLUSION MAY NOT APPLY TO YOU.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">11.</span>{" "}
            <span className="inline font-medium">Termination</span>
            <p className="mt-4">
              We may terminate or suspend your account and bar access to Service
              immediately, without prior notice or liability, under our sole
              discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of Terms.
            </p>
            <p className="mt-4">
              If you wish to terminate your account, you may simply discontinue
              using Service.
            </p>
            <p className="mt-4">
              All provisions of Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity
              and limitations of liability.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">12.</span>{" "}
            <span className="inline font-medium">Governing Law</span>
            <p className="mt-4">
              These Terms shall be governed and construed in accordance with the
              laws of Philippines, which governing law applies to agreement
              without regard to its conflict of law provisions.
            </p>
            <p className="mt-4">
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court, the
              remaining provisions of these Terms will remain in effect. These
              Terms constitute the entire agreement between us regarding our
              Service and supersede and replace any prior agreements we might
              have had between us regarding Service.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">13.</span>{" "}
            <span className="inline font-medium">Changes To Service</span>
            <p className="mt-4">
              We reserve the right to withdraw or amend our Service, and any
              service or material we provide via Service, in our sole discretion
              without notice. We will not be liable if for any reason all or any
              part of Service is unavailable at any time or for any period. From
              time to time, we may restrict access to some parts of Service, or
              the entire Service, to users, including registered users.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">14.</span>{" "}
            <span className="inline font-medium">Amendments To Terms</span>
            <p className="mt-4">
              We may amend Terms at any time by posting the amended terms on
              this site. It is your responsibility to review these Terms
              periodically.
            </p>
            <p className="mt-4">
              Your continued use of the Platform following the posting of
              revised Terms means that you accept and agree to the changes. You
              are expected to check this page frequently so you are aware of any
              changes, as they are binding on you.
            </p>
            <p className="mt-4">
              By continuing to access or use our Service after any revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, you are no longer authorized to
              use Service.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">15.</span>{" "}
            <span className="inline font-medium">Waiver And Severability</span>
            <p className="mt-4">
              No waiver by Company of any term or condition set forth in Terms
              shall be deemed a further or continuing waiver of such term or
              condition or a waiver of any other term or condition, and any
              failure of Company to assert a right or provision under Terms
              shall not constitute a waiver of such right or provision.
            </p>
            <p className="mt-4">
              If any provision of Terms is held by a court or other tribunal of
              competent jurisdiction to be invalid, illegal or unenforceable for
              any reason, such provision shall be eliminated or limited to the
              minimum extent such that the remaining provisions of Terms will
              continue in full force and effect.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">16.</span>{" "}
            <span className="inline font-medium">Acknowledgement</span>
            <p className="mt-4">
              BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE
              THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY
              THEM.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">16.</span>{" "}
            <span className="inline font-medium">Contact Us</span>
            <p className="mt-4">
              Please send your feedback, comments, requests for technical
              support by email: <b>paunlagui.cs.jm@gmail.com</b>.
            </p>
            <p className="mt-4">
              These{" "}
              <a href="client/src/views/pub/TermsAndConditions">
                Terms of Service
              </a>{" "}
              were created for <b>Sentry.ai</b> by{" "}
              <a href="https://policymaker.io">PolicyMaker.io</a> on 2022-07-08.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
