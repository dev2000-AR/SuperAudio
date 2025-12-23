import { useEffect } from "react";
import { useRouter } from "next/router";
import authService from "./authServices";

export interface UserProps {
  username: string;
  token: string;
}

export interface StateProps {
  user: UserProps | null;
}

// Definimos la interfaz para los props del componente
interface SubscriptionCheckerProps {
  user: UserProps | null;
}

const SubscriptionChecker = ({ user }: SubscriptionCheckerProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
      if (user && user.token) {
        try {
          const planData = await authService.verificar_plan(user.token);
          if (planData.status === 0) {
            // Redirigir a la página de selección de plan
            window.location.href = `https://paymentsup.superaudio.online/?username=${planData.username}&status=0`;
          } else if (planData.status === 1) {
            // Redirigir a la página de ajuste de método de pago
            window.location.href = `https://paymentsup.superaudio.online/?username=${planData.username}&status=45&plan=${planData.typeplan}`;
          } else if (planData.status === 2) {
            // El usuario tiene un plan activo, puede continuar
            //router.push("/home");
          }
          console.log(planData)
        } catch (error) {
          console.error("Error al verificar el plan:", error);
        }
      }
    };

    checkSubscription();
  }, [user, router]);

  return null; // Este componente no renderiza nada
};

export default SubscriptionChecker;