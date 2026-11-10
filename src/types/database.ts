export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Enums: {
      user_status: "LEAD" | "CUSTOMER" | "COHORT_MEMBER" | "VIP_CLIENT" | "CHURNED";
      lead_pipeline_status:
        | "SUBMITTED"
        | "UNDER_REVIEW"
        | "QUALIFIED"
        | "DISQUALIFIED"
        | "WHATSAPP_UNLOCKED"
        | "CONSULT_BOOKED"
        | "CLOSED_WON"
        | "CLOSED_LOST";
    };
    Tables: {
      premium_enquiries: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          city: string;
          service_interest: "individual" | "family" | "unsure";
          budget_interest: "1l" | "5l" | "10l" | "unsure";
          preferred_contact: "whatsapp" | "phone" | "email";
          referral_source: string | null;
          source_page: string;
          utm_params: Json;
          consent_accepted: boolean;
          consent_version: string;
          consent_text_snapshot: string;
          status: "new" | "contacted" | "qualified" | "not_fit" | "converted" | "closed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone: string;
          email?: string | null;
          city: string;
          service_interest: "individual" | "family" | "unsure";
          budget_interest: "1l" | "5l" | "10l" | "unsure";
          preferred_contact: "whatsapp" | "phone" | "email";
          referral_source?: string | null;
          source_page?: string;
          utm_params?: Json;
          consent_accepted: true;
          consent_version: string;
          consent_text_snapshot: string;
          status?: "new" | "contacted" | "qualified" | "not_fit" | "converted" | "closed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          email?: string | null;
          city?: string;
          service_interest?: "individual" | "family" | "unsure";
          budget_interest?: "1l" | "5l" | "10l" | "unsure";
          preferred_contact?: "whatsapp" | "phone" | "email";
          referral_source?: string | null;
          source_page?: string;
          utm_params?: Json;
          consent_accepted?: true;
          consent_version?: string;
          consent_text_snapshot?: string;
          status?: "new" | "contacted" | "qualified" | "not_fit" | "converted" | "closed";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          phone: string;
          email: string | null;
          name: string;
          city: string | null;
          status: Database["public"]["Enums"]["user_status"];
          source_page: string | null;
          utm_params: Json;
          first_purchase_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          email?: string | null;
          name: string;
          city?: string | null;
          status?: Database["public"]["Enums"]["user_status"];
          source_page?: string | null;
          utm_params?: Json;
          first_purchase_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          email?: string | null;
          name?: string;
          city?: string | null;
          status?: Database["public"]["Enums"]["user_status"];
          source_page?: string | null;
          utm_params?: Json;
          first_purchase_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      lead_intakes: {
        Row: {
          id: string;
          user_id: string;
          pipeline_status: Database["public"]["Enums"]["lead_pipeline_status"];
          intake_version: string;
          nri_country: string | null;
          parents_city: string;
          parent_ages: Json;
          primary_ailments: Json;
          current_medications: string;
          medical_condition_summary: string;
          source_page: string | null;
          utm_params: Json;
          submitted_at: string;
          reviewed_at: string | null;
          internal_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          pipeline_status?: Database["public"]["Enums"]["lead_pipeline_status"];
          intake_version?: string;
          nri_country?: string | null;
          parents_city: string;
          parent_ages: Json;
          primary_ailments: Json;
          current_medications: string;
          medical_condition_summary: string;
          source_page?: string | null;
          utm_params?: Json;
          submitted_at?: string;
          reviewed_at?: string | null;
          internal_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          pipeline_status?: Database["public"]["Enums"]["lead_pipeline_status"];
          intake_version?: string;
          nri_country?: string | null;
          parents_city?: string;
          parent_ages?: Json;
          primary_ailments?: Json;
          current_medications?: string;
          medical_condition_summary?: string;
          source_page?: string | null;
          utm_params?: Json;
          submitted_at?: string;
          reviewed_at?: string | null;
          internal_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      lead_consents: {
        Row: {
          id: string;
          intake_id: string;
          consent_type: string;
          consent_version: string;
          consent_text_snapshot: string;
          accepted: boolean;
          accepted_at: string;
          ip_hash: string;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          intake_id: string;
          consent_type?: string;
          consent_version?: string;
          consent_text_snapshot: string;
          accepted: boolean;
          accepted_at?: string;
          ip_hash: string;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          intake_id?: string;
          consent_type?: string;
          consent_version?: string;
          consent_text_snapshot?: string;
          accepted?: boolean;
          accepted_at?: string;
          ip_hash?: string;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      lead_events: {
        Row: {
          id: string;
          user_id: string | null;
          intake_id: string | null;
          event_name: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          intake_id?: string | null;
          event_name: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          intake_id?: string | null;
          event_name?: string;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
