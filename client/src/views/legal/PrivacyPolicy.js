import React from "react";

import Privacy from "../../assets/img/privacy.svg";
import BackNavigation from "../../components/navbars/BackNavigation";
import { ACCENT_BUTTON } from "../../assets/styles/styled-components";

/**
 * @description Privacy policy component for the application
 */
export default function PrivacyPolicy() {
  return (
    <>
      <BackNavigation
        backTo={"/"}
        contrast
        hasText
        isSmall={false}
        pageTitle={"Privacy Policy"}
      />
      <div className="flex flex-col items-center max-w-screen-xl min-h-screen px-6 py-8 mx-auto mt-16 lg:grid lg:gap-8 xl:gap-0 lg:grid-cols-12 font-Montserrat">
        <div className=" place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-500 md:text-5xl xl:text-6xl">
            Privacy Policy
          </h1>
          <p className="max-w-2xl mb-4 text-justify text-blue-500 lg:mb-8 md:text-lg lg:text-xl">
            This is the privacy policy of the Sentiment Analysis Evaluation
            Result project. This policy explains how we use your personal data
            and how we protect it. We will only use your personal data for the
            purpose of providing you the best experience on our website. We will
            not sell or rent your personal data to third parties. We will not
            use your personal data for any other purpose. We will not use your
            personal data to run a spam campaign. We will not use your personal
            data to send you unsolicited emails.
          </p>
          <p
            className={`flex items-center justify-center w-3/4 px-5 py-3 font-medium ${ACCENT_BUTTON}`}
          >
            Effective date: 2022-07-08
          </p>
        </div>
        <div className="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
          <img alt="mockup" src={Privacy} />
        </div>
      </div>
      <div className="p-8">
        <div className="py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 font-Montserrat bg-blue-200 rounded-lg">
          <div className="text-gray-500">
            <span className="inline">1.</span>{" "}
            <span className="inline font-medium">Introduction</span>
            <p className="mt-4">
              Welcome to <b> Morning Group</b>.
            </p>
            <p className="mt-4">
              <b>Morning Group</b> (“us”, “we”, or “our”) operates{" "}
              <b>Sentry.ai</b> (hereinafter referred to as <b>“Service”</b>).
            </p>
            <p className="mt-4">
              Our Privacy Policy governs your visit to <b>Sentry.ai</b>, and
              explains how we collect, safeguard and disclose information that
              results from your use of our Service.
            </p>
            <p className="mt-4">
              We use your data to provide and improve Service. By using Service,
              you agree to the collection and use of information in accordance
              with this policy. Unless otherwise defined in this Privacy Policy,
              the terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions.
            </p>
            <p className="mt-4">
              Our Terms and Conditions (<b>“Terms”</b>) govern all use of our
              Service and together with the Privacy Policy constitutes your
              agreement with us (<b>“agreement”</b>).
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">2.</span>{" "}
            <span className="inline font-medium">Definitions</span>
            <p className="mt-4">
              <b>SERVICE</b> means the Sentry.ai website operated by Morning
              Group.
            </p>
            <p className="mt-4">
              <b>PERSONAL DATA</b> means data about a living individual who can
              be identified from those data (or from those and other information
              either in our possession or likely to come into our possession).
            </p>
            <p className="mt-4">
              <b>USAGE DATA</b> is data collected automatically either generated
              by the use of Service or from Service infrastructure itself (for
              example, the duration of a page visit).
            </p>
            <p className="mt-4">
              <b>COOKIES</b> are small files stored on your device (computer or
              mobile device).
            </p>
            <p className="mt-4">
              <b>DATA CONTROLLER</b> means a natural or legal person who (either
              alone or jointly or in common with other persons) determines the
              purposes for which and the manner in which any personal data are,
              or are to be, processed. For the purpose of this Privacy Policy,
              we are a Data Controller of your data.
            </p>
            <p className="mt-4">
              <b>DATA PROCESSORS (OR SERVICE PROVIDERS)</b> means any natural or
              legal person who processes the data on behalf of the Data
              Controller. We may use the services of various Service Providers
              in order to process your data more effectively.
            </p>{" "}
            <p>
              <b>DATA SUBJECT</b> is any living individual who is the subject of
              Personal Data.
            </p>
            <p className="mt-4">
              <b>THE USER</b> is the individual using our Service. The User
              corresponds to the Data Subject, who is the subject of Personal
              Data.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">3.</span>{" "}
            <span className="inline font-medium">
              Information Collection and Use
            </span>
            <p className="mt-4">
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">4.</span>{" "}
            <span className="inline font-medium">Types of Data Collected</span>
            <p className="mt-4">
              <b>Personal Data</b>
            </p>
            <p className="mt-4">
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you (<b>“Personal Data”</b>). Personally identifiable
              information may include, but is not limited to:
            </p>
            <p className="mt-4">0.1. Email address</p>
            <p className="mt-4">0.2. First name and last name</p>
            <p className="mt-4">0.3. Phone number</p>
            <p className="mt-4">
              <b>Tracking Cookies Data</b>
            </p>
            <p className="mt-4">
              We use cookies and similar tracking technologies to track the
              activity on our Service and we hold certain information.
            </p>
            <p className="mt-4">
              Cookies are files with a small amount of data which may include an
              anonymous unique identifier. Cookies are sent to your browser from
              a website and stored on your device. Other tracking technologies
              are also used such as beacons, tags and scripts to collect and
              track information and to improve and analyze our Service.
            </p>
            <p className="mt-4">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Service.
            </p>
            <p className="mt-4">Examples of Cookies we use:</p>
            <p className="mt-4">
              0.1. <b>Session Cookies:</b> We use Session Cookies to operate our
              Service.
            </p>
            <p className="mt-4">
              0.2. <b>Preference Cookies:</b> We use Preference Cookies to
              remember your preferences and various settings.
            </p>
            <p className="mt-4">
              0.3. <b>Security Cookies:</b> We use Security Cookies for security
              purposes.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">5.</span>{" "}
            <span className="inline font-medium">Use of Data</span>
            <p className="mt-4">
              Morning Group uses the collected data for various purposes:
            </p>
            <p className="mt-4">
              0.1. to enable you to access and use our website, associated
              applications, and associated social media platforms
            </p>
            <p className="mt-4">
              0.2. to notify you about changes to our Service;
            </p>
            <p className="mt-4">0.3. to provide client support;</p>
            <p className="mt-4">
              0.4. for internal record keeping and administrative purposes
            </p>
            <p className="mt-4">
              0.5. for security and fraud prevention, and to ensure that our
              sites and apps are safe, secure, and used in line with our terms
              of use
            </p>
            <p className="mt-4 font-bold">
              Legitimate Reasons for Processing Your Personal Information
            </p>
            <p className="mt-4">
              We only collect and use your personal information when we have a
              legitimate reason for doing so. In which instance, we only collect
              personal information that is reasonably necessary to provide our
              services to you.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">6.</span>{" "}
            <span className="inline font-medium">Retention of Data</span>
            <p className="mt-4">
              We will retain your Personal Data only for as long as is necessary
              for the purposes set out in this Privacy Policy. We will retain
              and use your Personal Data to the extent necessary to comply with
              our legal obligations (for example, if we are required to retain
              your data to comply with applicable laws), resolve disputes, and
              enforce our legal agreements and policies.
            </p>
            <p className="mt-4">
              We will also retain Usage Data for internal analysis purposes.
              Usage Data is generally retained for a shorter period, except when
              this data is used to strengthen the security or to improve the
              functionality of our Service, or we are legally obligated to
              retain this data for longer time periods.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">7.</span>{" "}
            <span className="inline font-medium">Transfer of Data</span>
            <p className="mt-4">
              Your information, including Personal Data, may be transferred to –
              and maintained on – computers located outside of your state,
              province, country or other governmental jurisdiction where the
              data protection laws may differ from those of your jurisdiction.
            </p>
            <p className="mt-4">
              If you are located outside Philippines and choose to provide
              information to us, please note that we transfer the data,
              including Personal Data, to Philippines and process it there.
            </p>
            <p className="mt-4">
              Your consent to this Privacy Policy followed by your submission of
              such information represents your agreement to that transfer.
            </p>
            <p className="mt-4">
              Morning Group will take all the steps reasonably necessary to
              ensure that your data is treated securely and in accordance with
              this Privacy Policy and no transfer of your Personal Data will
              take place to an organisation or a country unless there are
              adequate controls in place including the security of your data and
              other personal information.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">8.</span>{" "}
            <span className="inline font-medium">Disclosure of Data</span>
            <p className="mt-4">
              We may disclose personal information that we collect, or you
              provide:
            </p>
            <p className="mt-4">
              0.1. <b>Disclosure for Law Enforcement.</b>
            </p>
            <p className="mt-4">
              Under certain circumstances, we may be required to disclose your
              Personal Data if required to do so by law or in response to valid
              requests by public authorities.
            </p>
            <p className="mt-4">
              0.2. <b>Business Transaction.</b>
            </p>
            <p className="mt-4">
              If we or our subsidiaries are involved in a merger, acquisition or
              asset sale, your Personal Data may be transferred.
            </p>
            <p className="mt-4">
              0.3. <b>Other cases. We may disclose your information also:</b>
            </p>
            <p className="mt-4">0.3.1. to our subsidiaries and affiliates;</p>
            <p className="mt-4">
              0.3.2. to contractors, service providers, and other third parties
              we use to support our business;
            </p>
            <p className="mt-4">
              0.3.3. to fulfill the purpose for which you provide it;
            </p>
            <p className="mt-4">
              0.3.4. for the purpose of including your company’s logo on our
              website;
            </p>
            <p className="mt-4">
              0.3.5. for any other purpose disclosed by us when you provide the
              information;
            </p>
            <p className="mt-4">0.3.6. with your consent in any other cases;</p>
            <p className="mt-4">
              0.3.7. if we believe disclosure is necessary or appropriate to
              protect the rights, property, or safety of the Company, our
              customers, or others.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">9.</span>{" "}
            <span className="inline font-medium">Security of Data</span>
            <p className="mt-4">
              The security of your data is important to us but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">10.</span>{" "}
            <span className="inline font-medium">
              Your Data Protection Rights Under General Data Protection
              Regulation (GDPR)
            </span>
            <p className="mt-4">
              If you are a resident of the European Union (EU) and European
              Economic Area (EEA), you have certain data protection rights,
              covered by GDPR.
            </p>
            <p className="mt-4">
              We aim to take reasonable steps to allow you to correct, amend,
              delete, or limit the use of your Personal Data.
            </p>
            <p className="mt-4">
              {" "}
              If you wish to be informed what Personal Data we hold about you
              and if you want it to be removed from our systems, please email us
              at <b>paunlagui.jm.cs@gmail.com</b>.
            </p>
            <p className="mt-4">
              In certain circumstances, you have the following data protection
              rights:
            </p>
            <p className="mt-4">
              0.1. the right to access, update or to delete the information we
              have on you;
            </p>
            <p className="mt-4">
              0.2. the right of rectification. You have the right to have your
              information rectified if that information is inaccurate or
              incomplete;
            </p>
            <p className="mt-4">
              0.3. the right to object. You have the right to object to our
              processing of your Personal Data;
            </p>
            <p className="mt-4">
              0.4. the right of restriction. You have the right to request that
              we restrict the processing of your personal information;
            </p>
            <p className="mt-4">
              0.5. the right to data portability. You have the right to be
              provided with a copy of your Personal Data in a structured,
              machine-readable and commonly used format;
            </p>
            <p className="mt-4">
              0.6. the right to withdraw consent. You also have the right to
              withdraw your consent at any time where we rely on your consent to
              process your personal information;
            </p>
            <p className="mt-4">
              Please note that we may ask you to verify your identity before
              responding to such requests. Please note, we may not able to
              provide Service without some necessary data.
            </p>
            <p className="mt-4">
              You have the right to complain to a Data Protection Authority
              about our collection and use of your Personal Data. For more
              information, please contact your local data protection authority
              in the European Economic Area (EEA).
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">11.</span>{" "}
            <span className="inline font-medium">
              Your Data Protection Rights under the California Privacy
              Protection Act (CalOPPA)
            </span>
            <p className="mt-4">
              CalOPPA is the first state law in the nation to require commercial
              websites and online services to post a privacy policy. The law’s
              reach stretches well beyond California to require a person or
              company in the United States (and conceivable the world) that
              operates websites collecting personally identifiable information
              from California consumers to post a conspicuous privacy policy on
              its website stating exactly the information being collected and
              those individuals with whom it is being shared, and to comply with
              this policy.
            </p>
            <p className="mt-4">
              According to CalOPPA we agree to the following:
            </p>
            <p className="mt-4">0.1. users can visit our site anonymously;</p>
            <p className="mt-4">
              0.2. our Privacy Policy link includes the word “Privacy”, and can
              easily be found on the home page of our website;
            </p>
            <p className="mt-4">
              0.3. users will be notified of any privacy policy changes on our
              Privacy Policy Page;
            </p>
            <p className="mt-4">
              0.4. users are able to change their personal information by
              emailing us at <b>paunlagui.jm.cs@gmail.com</b>.
            </p>
            <p className="mt-4">Our Policy on “Do Not Track” Signals:</p>
            <p className="mt-4">
              We honor Do Not Track signals and do not track, plant cookies, or
              use advertising when a Do Not Track browser mechanism is in place.
              Do Not Track is a preference you can set in your web browser to
              inform websites that you do not want to be tracked.
            </p>
            <p className="mt-4">
              You can enable or disable Do Not Track by visiting the Preferences
              or Settings page of your web browser.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">12.</span>{" "}
            <span className="inline font-medium">
              Your Data Protection Rights under the California Consumer Privacy
              Act (CCPA)
            </span>
            <p className="mt-4">
              If you are a California resident, you are entitled to learn what
              data we collect about you, ask to delete your data and not to sell
              (share) it. To exercise your data protection rights, you can make
              certain requests and ask us:
            </p>
            <p className="mt-4">
              <b>
                0.1. What personal information we have about you. If you make
                this request, we will return to you:
              </b>
            </p>
            <p className="mt-4">
              0.0.1. The categories of personal information we have collected
              about you.
            </p>
            <p className="mt-4">
              0.0.2. The categories of sources from which we collect your
              personal information.
            </p>
            <p className="mt-4">
              0.0.3. The business or commercial purpose for collecting or
              selling your personal information.
            </p>
            <p className="mt-4">
              0.0.4. The categories of third parties with whom we share personal
              information.
            </p>
            <p className="mt-4">
              0.0.5. The specific pieces of personal information we have
              collected about you.
            </p>
            <p className="mt-4">
              0.0.6. A list of categories of personal information that we have
              sold, along with the category of any other company we sold it to.
              If we have not sold your personal information, we will inform you
              of that fact.
            </p>
            <p className="mt-4">
              0.0.7. A list of categories of personal information that we have
              disclosed for a business purpose, along with the category of any
              other company we shared it with.
            </p>
            <p className="mt-4">
              Please note, you are entitled to ask us to provide you with this
              information up to two times in a rolling twelve-month period. When
              you make this request, the information provided may be limited to
              the personal information we collected about you in the previous 12
              months.
            </p>
            <p className="mt-4">
              <b>
                0.2. To delete your personal information. If you make this
                request, we will delete the personal information we hold about
                you as of the date of your request from our records and direct
                any service providers to do the same. In some cases, deletion
                may be accomplished through de-identification of the
                information. If you choose to delete your personal information,
                you may not be able to use certain functions that require your
                personal information to operate.
              </b>
            </p>
            <p className="mt-4">
              <b>
                0.3. To stop selling your personal information. We don’t sell or
                rent your personal information to any third parties for any
                purpose. We do not sell your personal information for monetary
                consideration. However, under some circumstances, a transfer of
                personal information to a third party, or within our family of
                companies, without monetary consideration may be considered a
                “sale” under California law. You are the only owner of your
                Personal Data and can request disclosure or deletion at any
                time.
              </b>
            </p>
            <p className="mt-4">
              If you submit a request to stop selling your personal information,
              we will stop making such transfers.
            </p>
            <p className="mt-4">
              Please note, if you ask us to delete or stop selling your data, it
              may impact your experience with us, and you may not be able to
              participate in certain programs or membership services which
              require the usage of your personal information to function. But in
              no circumstances, we will discriminate against you for exercising
              your rights.
            </p>
            <p className="mt-4">
              To exercise your California data protection rights described
              above, please send your request(s) by email:{" "}
              <b>paunlagui.jm.cs@gmail.com</b>.
            </p>
            <p className="mt-4">
              Your data protection rights, described above, are covered by the
              CCPA, short for the California Consumer Privacy Act. To find out
              more, visit the official California Legislative Information
              website. The CCPA took effect on 01/01/2020.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">13.</span>{" "}
            <span className="inline font-medium">Service Providers</span>
            <p className="mt-4">
              We may employ third party companies and individuals to facilitate
              our Service (<b>“Service Providers”</b>), provide Service on our
              behalf, perform Service-related services or assist us in analysing
              how our Service is used.
            </p>
            <p className="mt-4">
              These third parties have access to your Personal Data only to
              perform these tasks on our behalf and are obligated not to
              disclose or use it for any other purpose.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">14.</span>{" "}
            <span className="inline font-medium">Children’s Privacy</span>
            <p className="mt-4">
              Our Services are not intended for use by children under the age of
              18 (<b>“Child”</b> or <b>“Children”</b>).
            </p>
            <p className="mt-4">
              We do not knowingly collect personally identifiable information
              from Children under 18. If you become aware that a Child has
              provided us with Personal Data, please contact us. If we become
              aware that we have collected Personal Data from Children without
              verification of parental consent, we take steps to remove that
              information from our servers.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">15.</span>{" "}
            <span className="inline font-medium">
              Changes to This Privacy Policy
            </span>
            <p className="mt-4">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="mt-4">
              We will let you know via email and/or a prominent notice on our
              Service, prior to the change becoming effective and update
              “effective date” at the top of this Privacy Policy.
            </p>
            <p className="mt-4">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span className="inline">16.</span>{" "}
            <span className="inline font-medium">Contact Us</span>
            <p className="mt-4">
              If you have any questions about this Privacy Policy, please
              contact us by email: <b>paunlagui.jm.cs@gmail.com</b>.
            </p>
            <p className="mt-4">
              This{" "}
              <a href="client/src/views/pub/PrivacyPolicy">Privacy Policy</a>{" "}
              was created for <b>Sentry.ai</b> by{" "}
              <a href="https://policymaker.io">PolicyMaker.io</a> on 2022-07-08.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
